import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';

import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import io from 'socket.io-client';

const game = new Chess();

const socket = io('http://localhost:3037', {
  transports: ['websocket'],
});

export type ChessGameProps = {
  playerColor: 'white' | 'black';
  code: string;
};

export const ChessGame = ({ playerColor, code }: ChessGameProps) => {
  const [status, setStatus] = useState('');
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameCurrentColor, setGameCurrentColor] = useState<'white' | 'black'>(
    'white',
  );
  const [time, setTime] = useState(600);

  const updateStatus = useCallback(() => {
    let status = '';

    let moveColor = 'White';
    if (game.turn() === 'b') {
      moveColor = 'Black';
    }
    setGameCurrentColor(game.turn() === 'b' ? 'black' : 'white');

    // checkmate?
    if (game.in_checkmate()) {
      status = 'Game over, ' + moveColor + ' is in checkmate.';
    }

    // draw?
    else if (game.in_draw()) {
      status = 'Game over, drawn position';
    } else if (gameOver) {
      status = 'Opponent disconnected, you win!';
    } else if (!gameHasStarted) {
      status = `Waiting for ${
        playerColor === 'white' ? 'black' : 'white'
      } to join`;
    }

    // game still on
    else {
      status = moveColor + ' to move';

      // check?
      if (game.in_check()) {
        status += ', ' + moveColor + ' is in check';
      }
    }

    setStatus(status);
  }, [gameHasStarted, gameOver, playerColor]);

  useEffect(() => {
    updateStatus();

    // Socket event listeners
    socket.on('newMove', (move) => {
      game.move(move);
      console.log('newMove', move);
      updateStatus();
    });

    socket.on('startGame', () => {
      setGameHasStarted(true);
      console.log('startGame');
      updateStatus();
    });

    socket.on('gameOverDisconnect', () => {
      setGameOver(true);
      console.log('gameOverDisconnect');
      updateStatus();
    });
  }, [updateStatus]);

  useEffect(() => {
    return () => {
      console.log('socket.off');
      socket.off('newMove');
      socket.off('startGame');
      socket.off('gameOverDisconnect');
    };
  }, []);

  useEffect(() => {
    if (code) {
      socket.emit('joinGame', {
        code: code,
      });
    }
  }, [code]);

  const canDrag = gameHasStarted && !gameOver;

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (canDrag && gameCurrentColor === playerColor) {
      timer = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [canDrag, time, gameCurrentColor, playerColor]);

  const minutes = Math.floor(time / 60);
  // 00 to 60
  const seconds = (time % 60).toString().padStart(2, '0');

  return (
    <div>
      <div style={{ position: 'relative' }}>
        {!canDrag && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(255,255,255,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            {status}
          </div>
        )}
        <Chessboard
          id={234}
          position={game.fen()}
          onPieceDrop={(source, target, piece) => {
            if (playerColor === 'white' && !piece.includes('w')) {
              return false;
            }

            if (playerColor === 'black' && !piece.includes('b')) {
              return false;
            }

            const theMove = {
              from: source,
              to: target,
              promotion: 'q', // NOTE: always promote to a queen for simplicity
            } as const;
            // see if the move is legal

            const move = game.move(theMove);

            // illegal move
            if (move === null) return false;

            socket.emit('move', theMove);

            updateStatus();

            return true;
          }}
          boardOrientation={playerColor}
          onPieceDragBegin={(piece) => {
            // do not pick up pieces if the game is over
            if (game.game_over()) return false;
            if (!gameHasStarted) return false;
            if (gameOver) return false;

            if (
              (playerColor === 'black' && piece.search(/^w/) !== -1) ||
              (playerColor === 'white' && piece.search(/^b/) !== -1)
            ) {
              return false;
            }

            // only pick up pieces for the side to move
            if (
              (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
              (game.turn() === 'b' && piece.search(/^w/) !== -1)
            ) {
              return false;
            }
          }}
        />
      </div>
      <div>Status:{status}</div>
      <div>{game.pgn()}</div>
      <div>
        Time: {minutes}:{seconds}
      </div>
    </div>
  );
};

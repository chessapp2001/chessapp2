import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';

import { Chess } from 'chess.js';
import { useRouter } from 'next/router';
import { Chessboard } from 'react-chessboard';
import { Socket } from 'socket.io-client';

const game = new Chess();

export const ChessGame = ({
  playerColor,
  socket,
}: {
  playerColor: 'white' | 'black';
  socket: Socket;
}) => {
  const [status, setStatus] = useState('');
  const [pgn, setPgn] = useState('');
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const updateStatus = useCallback(() => {
    let status = '';

    let moveColor = 'White';
    if (game.turn() === 'b') {
      moveColor = 'Black';
    }

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
      status = 'Waiting for black to join';
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
    setPgn(game.pgn());
  }, [gameHasStarted, gameOver]);

  useEffect(() => {
    updateStatus();

    // Socket event listeners
    socket.on('newMove', (move) => {
      game.move(move);
      updateStatus();
    });

    socket.on('startGame', () => {
      setGameHasStarted(true);
      updateStatus();
    });

    socket.on('gameOverDisconnect', () => {
      setGameOver(true);
      updateStatus();
    });

    // Cleanup
    return () => {
      socket.off('newMove');
      socket.off('startGame');
      socket.off('gameOverDisconnect');
    };
  }, [socket, updateStatus]);

  const router = useRouter();
  const code = router.query.code;

  useEffect(() => {
    if (code) {
      socket.emit('joinGame', {
        code: code,
      });
    }
  }, [code, socket]);

  return (
    <div>
      <Chessboard
        id={234}
        arePiecesDraggable
        position={game.fen()}
        onPieceDrop={(source, target) => {
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
      <div>{status}</div>
      <div>{pgn}</div>
    </div>
  );
};

import React from 'react';
import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

import LayoutL from '../components/LayoutL';

const ChessGame = dynamic(
  () => import('./meta_integrer/mainsite').then((mod) => mod.ChessGame),
  {
    ssr: false,
  },
);

function Sell() {
  const router = useRouter();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3037', {
      transports: ['websocket'],
    });
    // @ts-ignore
    setSocket(newSocket);

    console.log('newSocket', newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const playerColor = router.query.playerColor === 'white' ? 'white' : 'black';

  console.log('playerColor', playerColor, router);

  return (
    <>
      <div id="my-div" className="sell-container">
        <LayoutL>
          <div className="ui horizontal segments">
            <div className="ui   segment">
              <a className="item " id="L" href="http://localhost:3000/nr1">
                {' '}
                Table nr1
              </a>
            </div>
            <div className="ui  segment">
              <a className="item " id="L" href="http://localhost:3000/nr2">
                {' '}
                Table nr2
              </a>
            </div>
          </div>
          <div className="mainsite-container">
            {socket && <ChessGame playerColor={playerColor} socket={socket} />}
          </div>
        </LayoutL>
      </div>
      <link
        async
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
      <style jsx>{`
        .mainsite-container {
          display: flex; // Use flexbox
          justify-content: space-between; // Align items with space between
        }
      `}</style>
    </>
  );
}

export default Sell;

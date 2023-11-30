import { useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Button, Input } from 'semantic-ui-react';

import LayoutL from '../components/LayoutL';
import { ChessGameProps } from './meta_integrer/mainsite';

const ChessGame = dynamic(
  () => import('./meta_integrer/mainsite').then((mod) => mod.ChessGame),
  {
    ssr: false,
  },
);

const MetaWrapper = ({ playerColor, code }: ChessGameProps) => {
  const [isLogin, setIsLogin] = useState(false);

  if (isLogin) {
    return <ChessGame playerColor={playerColor} code={code} />;
  }

  return <Button onClick={() => setIsLogin(true)}>Connect to Metamask</Button>;
};

function Sell() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const code = router.query.code?.toString();

  const playerColor = router.query.playerColor === 'white' ? 'white' : 'black';

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
            {code ? (
              <MetaWrapper playerColor={playerColor} code={code} />
            ) : (
              <div>
                <Input
                  label="enter code"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                />
                <Button
                  inverted
                  color="green"
                  onClick={() => {
                    window.open(
                      `http://localhost:3000/Main_Site?code=${inputValue}`,
                    );
                    router.push(
                      `/Main_Site?code=${inputValue}&playerColor=white`,
                    );
                  }}
                >
                  Przejdź
                </Button>
              </div>
            )}
          </div>
        </LayoutL>
      </div>
      <link
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

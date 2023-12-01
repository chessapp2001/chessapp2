import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Input } from 'semantic-ui-react';
import { Button, Segment } from 'semantic-ui-react';

import Layout from '../components/Layout';
import web3 from '../ethereum/web3';
import logo from './Metamask-Logo.png';
import MyComponent from './meta_integrer/w_components';
//metamask section
import ConnectToMetaMask from './meta_integrer/w_connect';

const ReactDOM = require('react-dom');

function App() {
  const [inputValue, setInputValue] = useState('');
  const [worldGenerated, setGenerateWorld] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const router = useRouter();
  function generateWorld() {
    setGenerateWorld(true);
  }

  const handleCreatePage = () => {
    router.push(`/Contract/${inputValue}`);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
          jsaction="VQAsE"
          className="r48jcc pT0Scc iPVvYb"
          style={{
            maxWidth: '600px',
            height: '107px',
            margin: '0px',
            width: '107px',
          }}
          alt="File:MetaMask Fox.svg - Wikimedia Commons"
          jsname="kn3ccd"
        />
        <h1>MetaMask</h1>
        <h3>Połącz się do swojego portfela MetaMask</h3>
        <div className="App">
          <ConnectToMetaMask />
        </div>
      </div>
    </div>
  );
}

export default App;

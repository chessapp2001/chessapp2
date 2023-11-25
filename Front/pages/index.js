import React, { useState } from "react";
const ReactDOM = require("react-dom");
import logo from "./Metamask-Logo.png";
import Layout from "../components/Layout";
import Link from "next/link";

import { Input } from "semantic-ui-react";
import { Button, Segment } from "semantic-ui-react";
import { useRouter } from "next/router";

//metamask section
import ConnectToMetaMask from "./meta_integrer/w_connect";
import MyComponent from "./meta_integrer/w_components";
import web3 from "../../ethereum/web3";

function App() {
	const [inputValue, setInputValue] = useState("");
	const [worldGenerated, setGenerateWorld] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const [showPopup, setShowPopup] = useState(true);
	const router = useRouter();
	function generateWorld() {
		setGenerateWorld(true);
	}
	function World() {
		return <div>{/* Three.js canvas */}</div>;
	}
	const handleCreatePage = () => {
		router.push(`/Contract/${inputValue}`);
	};

	return (
		<div id="popup" class="popup">
			<div class="popup-content">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
					jsaction="VQAsE"
					className="r48jcc pT0Scc iPVvYb"
					style={{
						maxWidth: "600px",
						height: "107px",
						margin: "0px",
						width: "107px",
					}}
					alt="File:MetaMask Fox.svg - Wikimedia Commons"
					jsname="kn3ccd"
				/>
				<h1>
					MetaMask
				</h1>
                <h3>
					Połącz się do swojego portfela MetaMask
				</h3>
				<div className="App">
	
					<ConnectToMetaMask />
				</div>
			</div>
		</div>
	);
}

export default App;

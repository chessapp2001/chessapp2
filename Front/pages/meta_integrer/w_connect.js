import React, { Component } from "react";
import { useRouter } from "next/router";
import web3 from '../../../ethereum/web3';

class ConnectToMetaMask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      isConnected: false
    };
  }

  async componentDidMount() {
  
    // Sprawdź, czy MetaMask jest zainstalowany
    if (typeof window.ethereum !== "undefined") {
      // Połącz się z MetaMask
      try {
        // Poproś użytkownika o autoryzację połączenia z MetaMask
        await window.ethereum.enable();
        // Wyświetl adres aktywnego konta MetaMask w konsoli
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        this.setState({ isConnected: true }); // ustawia stan połączenia na true
      
        // nasłuchuj zmiany konta MetaMask
        window.ethereum.on("accountsChanged", accounts => {
          if (accounts.length === 0) {
            // użytkownik się rozłączył
            console.log("Użytkownik się rozłączył");
            this.setState({ isConnected: false });
      
          } else {
            // użytkownik zmienił konto
            console.log("Zmiana konta MetaMask:", accounts[0]);
          }
        });
      } catch (error) {
        // Użytkownik odrzucił autoryzację połączenia
        console.error("Użytkownik nie autoryzował połączenia", error);
      }
    } else {
      // MetaMask nie jest zainstalowany
      console.error("MetaMask nie jest zainstalowany");
    }
  }

  connect = async () => {
    // Sprawdź, czy MetaMask jest zainstalowany
    if (typeof window.ethereum !== "undefined") {
      // Połącz się z MetaMask
      try {
        // Poproś użytkownika o autoryzację połączenia z MetaMask
        await window.ethereum.enable();
        // Wyświetl adres aktywnego konta MetaMask w konsoli
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        this.setState({ isConnected: true }); // ustawia stan połączenia na true
      } catch (error) {
        // Użytkownik odrzucił autoryzację połączenia
        console.error("Użytkownik nie autoryzował połączenia", error);
      }
    } else {
      // MetaMask nie jest zainstalowany
      console.error("MetaMask nie jest zainstalowany");
    }
  };

  handleClick = () => {
    this.setState({ isActive: !this.state.isActive });
    if (!this.state.isConnected) {
      this.connect(); // wywołaj funkcję połączenia, jeśli przycisk jest nieaktywny
    }
    
    
  };

  render() {
    const { isActive, isConnected } = this.state;

    return (<div>
      <button 
      class="button4"
        style={{
          backgroundColor: isConnected ? "green"  : "red"
        }}
        onClick={this.handleClick}
      >
        {isConnected
          ? "Connected"
          : "Connect to MetaMask"}
      </button>
      <button class="button3"
        style={{
          backgroundColor: isConnected ? "white"  : "white"
        }}
        onClick={this.handleClick}
        disabled={this.state.isActive}
      >
       {isConnected
          ?<a class="button6" href="http://localhost:3000/Main_Site" >Przejdz na strone</a>
          : <p> Przejdz na strone </p>} 
        
      </button>
      
      </div>
    );
  }
}

export default ConnectToMetaMask;
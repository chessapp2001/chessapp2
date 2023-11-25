import React from "react";
import oxygenIntegrity from "../../../ethereum/w_oxygen";
import web3 from "../../../ethereum/web3";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"
import {useState , useEffect} from 'react';


function App(){
  const [loading, setLoading] = useState(false)
  useEffect(() =>{
    setLoading(true)
    setTimeout(() =>{
      setLoading(false)
    },)

  }
  )
}
class CreateLeszy extends React.Component {
  state = {
    accept: "",
    isLoading: false
  };

  TwoFirstCall = async () => {
    this.setState({ isLoading: true });
    const accounts = await web3.eth.getAccounts();
    await oxygenIntegrity.methods
      .TwoFirst(accounts[0])
      .send({ gas: 20000000, from: accounts[0] });
      this.setState({ isLoading: false });
  };

  AddLeszy = async () => {
    this.setState({ isLoading: true });
    const accounts = await web3.eth.getAccounts();
    await oxygenIntegrity.methods
      .AddLeszy()
      .send({
        gas: 20000000,
        from: accounts[0],
        value: 50000000000000000,
      });
   // this.setState({ accept: "Czekaj na akceptacje przez system" });
    this.setState({ isLoading: false });
  };

  

  render() {
    const { isLoading } = this.state;

    return (
      <div>
         {isLoading && (
          <div id="loading">
            <ClimbingBoxLoader color={'#000000'} loading={isLoading} size={100} />
          </div>
        )}
          <button class="styled-button"  onClick={this.TwoFirstCall.bind(this, App)}>
          DODAJ 2 PIERWSZYCH LESZY <br></br><br></br><img src="https://previews.123rf.com/images/ngupakarti/ngupakarti1908/ngupakarti190800680/128952842-one-line-drawing-of-a-man-invite-to-shake-hand-vector-illustration-minimal-design.jpg" alt="Tu podaj tekst alternatywny" className="obraz"/>
        </button>
        
          <button class="styled-button"  onClick={this.AddLeszy.bind(this, App)}>
            DODAJ NASTEPNYCH LESZY   <br></br><br></br><img src="https://c7.alamy.com/comp/2GPMK6X/continuous-one-line-of-businesswoman-and-businessman-in-silhouette-minimal-style-perfect-for-cards-party-invitations-posters-stickers-clothing-black-abstract-icon-business-concept-2GPMK6X.jpg" alt="Tu podaj tekst alternatywny" className="obraz"/>
          </button>
       
    
        <h1>{this.state.accept}</h1>
      </div>
    );
  }
}

export default CreateLeszy;

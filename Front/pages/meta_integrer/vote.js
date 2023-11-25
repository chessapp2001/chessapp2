import React from "react";
import oxygenIntegrity from "../../../ethereum/w_oxygen";
import web3 from "../../../ethereum/web3";

class Vote extends React.Component {
  state = {
    Leszy: "",
    Feedback: "",
    Feedback1: "",
  
  };
  leszy= async()=>{
    const manager=await oxygenIntegrity.methods.toCheck().call()
    this.setState({Leszy: manager})

  }
  yes = async () => {
    const accounts = await web3.eth.getAccounts();
    await oxygenIntegrity.methods
      .VoteYes(accounts[0])
      .send({ gas: 20000000, from: accounts[0] })
    
      this.setState({Feedback: "Oddałeś głos na Tak"})
      

  };

    no = async () => {
    await oxygenIntegrity.methods
      .VoteNo().call()
      await oxygenIntegrity.methods
      .oxygens().call()
      this.setState({Feedback1: "Oddałeś głos na Nie"})
    
  };

  

  render() {
    

    return (
      <div className="glosowanie">
         
          <button class="positive ui button" onClick= {this.leszy}>
          Wyświetl adres Leszego, na który musisz oddać głos
        </button>
        
          <h3> {this.state.Leszy}</h3>
  
          <button class="positive ui button" onClick={this.yes}>
          TAK
        </button>
        <h3> {this.state.Feedback}</h3>
        
          <button class="negative ui button" onClick={this.no}>
           NIE
          </button>
          <h3> {this.state.Feedback1}</h3>
       
      </div>
    );
  }
}

export default Vote;

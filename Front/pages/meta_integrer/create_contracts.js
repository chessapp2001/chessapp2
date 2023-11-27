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
          
        
          
       
    
        <h1>{this.state.accept}</h1>
      </div>
    );
  }
}

export default CreateLeszy;

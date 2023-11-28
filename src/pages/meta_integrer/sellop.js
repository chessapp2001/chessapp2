import React from 'react';

import oxygenIntegrity from '@/ethereum/w_oxygen';
import web3 from '@/ethereum/web3';

//import compiledOxygen from "@/ethereum/build/oxygen.json";

class SelloP extends React.Component {
  state = {
    area: [],
    price: [],
    lease_time: [],
    owner: [],
    contractManager: [],
    id: [],
    result: 'g',
  };

  ViewFields = async () => {
    //const accounts = ['0x0cfCc60D1FE009DD5Ce23189166f1C6Bd1074FA2','0xCD9eD88dcA82227D364B5dBFFB06FFF68f8F29f3']
    const accounts = await web3.eth.getAccounts();
    //const informations= await oxygen.methods.informations(myAdress,0).call();

    const data = await oxygenIntegrity.methods.getDeployedOxygens().call();
    const dl = data.length;
    const oxygens = [];

    for (let i = 0; i < dl; i++) {
      oxygens.push(Getoxygen(data[i]));
    }
    //const oxygen = new web3.eth.Contract(compiledOxygen.abi, data[0]);
    const price = [];
    const id = [];
    const area = [];
    const lease_time = [];
    const owner = [];
    const contractManager = [];
    let result = 'h';

    for (let k = 0; k < dl; k++) {
      const idd = await oxygens[k].methods.idd().call();
      await oxygenIntegrity.methods
        .remember2(data[k])
        .call()
        .then((result1) => {
          result = result1;
        });
      for (let i = 0; i <= idd; i++) {
        const informations = await oxygens[k].methods
          .informations(result, i)
          .call();
        if (
          informations._landinfo._area != 0 &&
          informations._landinfo._price != 0 &&
          informations._landinfo._lease_time != 0 &&
          informations._landinfo._owner != 0
        ) {
          id.push(i);
          area.push(informations._landinfo._area);
          price.push(informations._landinfo._price);
          lease_time.push(informations._landinfo._lease_time);
          owner.push(informations._landinfo._owner);

          contractManager.push(result);
        }
      }
    }
    this.setState({ id: id });
    this.setState({ area: area });
    this.setState({ price: price });
    this.setState({ lease_time: lease_time });
    this.setState({ owner: owner });
    this.setState({ contractManager: contractManager });
    this.setState({ result: result });
  };

  purchaseOB2 = async (id, contractManager, price) => {
    //const accounts = ['0x0cfCc60D1FE009DD5Ce23189166f1C6Bd1074FA2','0xCD9eD88dcA82227D364B5dBFFB06FFF68f8F29f3']
    const accounts = await web3.eth.getAccounts();
    const data = await oxygenIntegrity.methods.remember(contractManager).call();
    const oxygen = Getoxygen(data);
    //const informations= await oxygen.methods.informations(myAdress,0).call();

    await oxygen.methods
      .purchaseOB(id, contractManager)
      .send({ gas: 20000000, from: accounts[0], value: price });

    //const oxygen = new web3.eth.Contract(compiledOxygen.abi, data[0]);
  };

  render() {
    const fields = [
      'id',
      'contractManager',
      'area',
      'price',
      'lease_time',
      'owner',
    ];

    return (className = (
      <div>
        <button className="button button1" onClick={this.ViewFields}>
          WclassName=l wszystkie aktualne obligacje, które można dzierżawić
        </button>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Adres Leszego</th>
              <th>Powierzchnia[M^2]</th>
              <th>Cena [WEI]</th>
              <th>Czas dzierżawy [SEKUNDY]</th>
              <th>Dane właściciela</th>
              <th>Dzierżaw</th>
            </tr>
          </thead>
          <tbody>
            {this.state.area.map((_, index) => (
              <tr key={index}>
                {fields.map((field) => (
                  <td key={field} data-label={field}>
                    {this.state[field][index]}
                    className=
                  </td>
                ))}{' '}
                className=
                <td className="right aligned">
                  <button
                    className="positive ui button"
                    onClick={() =>
                      this.purchaseOB2(
                        this.state.id[index],
                        this.state.contractManager[index],
                        this.state.price[index],
                      )
                    }
                  >
                    Dzierżaw
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  }
}

export default SelloP;

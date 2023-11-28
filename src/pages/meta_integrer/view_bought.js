import React from 'react';

import oxygenIntegrity from '@/ethereum/w_oxygen';
import web3 from '@/ethereum/web3';

//import compiledOxygen from "@/ethereum/build/oxygen.json";

class ViewBought extends React.Component {
  state = {
    id: [],
    amount: [],
    PurchaseDate: [],
    SellDate: [],
    buyer: [],
    owner: [],
    empty: '',
  };

  ViewHistory = async () => {
    const accounts = await web3.eth.getAccounts();
    const data = await oxygenIntegrity.methods.getDeployedOxygens().call();
    const dl = data.length;
    const oxygens = [];

    for (let i = 0; i < dl; i++) {
      oxygens.push(Getoxygen(data[i]));
    }

    //const oxygen = new web3.eth.Contract(compiledOxygen.abi, data[0]);
    const amount = [];
    const PurchaseDate = [];
    const SellDate = [];
    const buyer = [];
    const id = [];
    const owner = [];
    let result = '';
    let num = 'A';

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
          for (let m = 0; m < informations._numPurchases; m++) {
            const history = await oxygens[k].methods
              .history(result, i, m)
              .call();
            if (history.buyer == accounts[0]) {
              amount.push(history.amount);
              const timestamp2 = history.timestamp;
              const date1 = new Date(timestamp2 * 1000); // Convert

              const newTimestamp =
                date1.getTime() + informations._landinfo._lease_time * 1000; // Add 111 seconds in milliseconds
              const date2 = new Date(newTimestamp);
              id.push(num + i);
              PurchaseDate.push(date1.toLocaleString());
              SellDate.push(date2.toLocaleString());
              buyer.push(history.buyer);

              owner.push(result);
              this.setState({ empty: ' ' });
            } else {
              this.setState({
                empty: 'Obecnie nie posiadasz żadnych obligacji',
              });
            }
          }
        }
      }
      num = String.fromCharCode(num.charCodeAt(0) + 1);
    }
    this.setState({ id: id });
    this.setState({ PurchaseDate: PurchaseDate });
    this.setState({ SellDate: SellDate });
    this.setState({ buyer: buyer });
    this.setState({ amount: amount });
    this.setState({ owner: owner });
  };

  render() {
    const fields = [
      'id',
      'amount',
      'PurchaseDate',
      'SellDate',
      'buyer',
      'owner',
    ];

    return (
      <div>
        <button className="button button1" onClick={this.ViewHistory}>
          wyświetl historie
        </button>
        <h1>{this.state.empty}</h1>
        <table className="ui celled table">
          <thead>
            <tr>
            className=Id</th>
              <th>Kwota</th>
              <th>Data zakupu</th>
              <th>Data wygaśnięcia dzierżawy</th>
           className=>Sprzedawca</th>
              <th>Wlaściciel</th>
              <th>Blockchain</th>
            </tr>
          </thead>
          <tbody>
            {this.state.amount.map((_, index) => (
              <tr key={index}>
                {fields.map((field) => (
                  <td key={field} data-label={field}>
                    {this.state[field][index]}
                  </td>
                ))}{' '}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ViewBought;

import React from 'react';
import { useEffect, useState } from 'react';

import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

import oxygenIntegrity from '../../ethereum/w_oxygen';
import web3 from '../../ethereum/web3';

///import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });
}

class MyComponent extends React.Component {
  state = {
    area: '',
    price: '',
    lease_time: '',
    owner: '',
    accounts: false,
    h: '',
    isLoading: false,
  };

  handleAreaChange = (event) => {
    this.setState({ area: event.target.value });
  };

  handlePriceChange = (event) => {
    this.setState({ price: event.target.value });
  };

  handleLeaseTimeChange = (event) => {
    this.setState({ lease_time: event.target.value });
  };

  handleOwnerChange = (event) => {
    this.setState({ owner: event.target.value });
  };

  addOffer = async () => {
    this.setState({ isLoading: true });

    const { area, price, lease_time, owner } = this.state;

    const accounts = await web3.eth.getAccounts();

    const data = await oxygenIntegrity.methods.getDeployedOxygens().call();

    let deployed = 'f';

    await Promise.all(
      data.map(async (item) => {
        const result = await oxygenIntegrity.methods
          .remember(accounts[0])
          .call();
        if (result === item) {
          deployed = item;
          this.setState({ h: deployed });
        }
      }),
    );

    const oxygen = Getoxygen(deployed);
    if (this.state.accounts == false) {
      await oxygen.methods
        .addOffer(area, web3.utils.toWei(price, 'ether'), lease_time, owner)
        .send({ gas: 20000000, from: accounts[0] });
      this.setState({ accounts: true });
    } else
      await oxygen.methods
        .addOffer(area, price, lease_time, owner)
        .send({ gas: 20000000, from: accounts[0] });
    this.setState({ isLoading: false });
  };

  //	const oxygen = new web3.eth.Contract(compiledOxygen.abi, data[0]);

  render() {
    const { isLoading } = this.state;

    return (
      <div>
        {isLoading && (
          <div id="loading">
            <ClimbingBoxLoader
              color={'#000000'}
              loading={isLoading}
              size={100}
            />
          </div>
        )}
        {this.state.h}
        <div class="ui green inverted segment dipa">
          <div class="dupa">
            {' '}
            <h1>Wielkość działki:</h1>
          </div>
          <div class="ui  input">
            <input
              type="text"
              name="area"
              value={this.state.area}
              onChange={this.handleAreaChange}
              className="my-input-class"
            />
            <div class="ui basic label">m^2</div>
          </div>
        </div>
        <div class="ui green inverted segment dipa">
          <h1>Cena:</h1>{' '}
          <div class="ui input">
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handlePriceChange}
            />
          </div>{' '}
          <div class="ui basic label">eth</div>
        </div>
        <div class="ui green inverted segment dipa">
          <h1>Termin wynajmu: </h1>{' '}
          <div class="ui input">
            <input
              type="text"
              name="lease_time"
              value={this.state.lease_time}
              onChange={this.handleLeaseTimeChange}
            />
          </div>
          <div class="ui basic label">sec</div>
        </div>
        <div class="ui green inverted segment dipa">
          <h1>Właściciel:</h1>{' '}
          <div class="ui input">
            <input
              type="text"
              name="owner"
              value={this.state.owner}
              onChange={this.handleOwnerChange}
            />
          </div>
        </div>
        <div align="center">
          <button
            class="button button1"
            onClick={this.addOffer.bind(this, App)}
          >
            Stwórz kontrakt
          </button>
        </div>
      </div>
    );
  }
}

export default MyComponent;

import React from "react";
import oxygenIntegrity from "../../../ethereum/w_oxygen";
import web3 from "../../../ethereum/web3";
//import compiledOxygen from "../../../ethereum/build/oxygen.json";

class ViewFields extends React.Component {
	state = {
		ID: [],
		area: [],
		price: [],
		lease_time: [],
		owner: [],
		contractManager: [],
		oxygens: [],
	
	};

	ViewFields = async () => {
		const accounts = await web3.eth.getAccounts();
		//const informations= await oxygen.methods.informations(myAdress,0).call();

		const data = await oxygenIntegrity.methods.getDeployedOxygens().call();
		const dl = data.length;
		const oxygens = [];

		for (let i = 0; i < dl; i++) {
			oxygens.push(Getoxygen(data[i]));
		}
		this.setState({ oxygens: data });
		//const oxygen = new web3.eth.Contract(compiledOxygen.abi, data[0]);
		const price = [];
		const area = [];
		const lease_time = [];
		const owner = [];
		const contractManager = [];
		const ID = [];
		let num = "A";
		

		for (let k = 0; k < dl; k++) {
			const idd = await oxygens[k].methods.idd().call();

			for (let i = 0; i <= idd; i++) {
				const informations = await oxygens[k].methods
					.informations(accounts[0], i)
					.call();
				if (
					informations._landinfo._area != 0 &&
					informations._landinfo._price != 0 &&
					informations._landinfo._lease_time != 0 &&
					informations._landinfo._owner != 0
				) {
					ID.push(num + i);
					area.push(informations._landinfo._area);
					price.push(informations._landinfo._price);
					lease_time.push(informations._landinfo._lease_time);
					owner.push(informations._landinfo._owner);
					contractManager.push(accounts[0]);
				}
			}
			num = String.fromCharCode(num.charCodeAt(0) + 1);
		}
	; 
		this.setState({ ID: ID });
		this.setState({ area: area });
		this.setState({ price: price });
		this.setState({ lease_time: lease_time });
		this.setState({ owner: owner });
		this.setState({ contractManager: contractManager });
	};

	render() {
		const fields = [
			"ID",
			"contractManager",
			"area",
			"price",
			"lease_time",
			"owner",
		];
		
		return (
			<div>
				<button class="button button1" onClick={this.ViewFields}>
					Wyświetl swoje obligacje
				</button>
			
				<table class="ui celled table">
					<thead>
						<tr>
							<th> Id działki</th>
							<th>Adres Leszego</th>
							<th>Powierzchnia[M^2]</th>
							<th>Cena [WEI]</th>
							<th>Czas dzierżawy [SEKUNDY]</th>
							<th>Dane właściciela</th>
						</tr>
					</thead>
					<tbody>
						{this.state.area.map((_, index) => (
							<tr key={index}>
								{fields.map((field) => (
									<td key={field} data-label={field}>
										{this.state[field][index]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				
			</div>
		);
	}
}

export default ViewFields;

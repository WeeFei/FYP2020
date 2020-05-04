import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import axios from 'axios'
import Items from './components/items';
import cors from 'cors';

import "./App.css";

class App extends Component {
  state = { storageValue: "", web3: null, accounts: null, contract: null, newValue: "", itemName: "", items: []};

  componentDidMount = async () => {
    try {
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeMongo = this.handleChangeMongo.bind(this);
      this.handleSubmitMongo = this.handleSubmitMongo.bind(this);

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

    //api call to interact with mongodb
    const data = await this.getDataAxios();
    this.setState({items: data});
    console.log(data);
  };

  //axios GET
  async getDataAxios(){
    const response = await axios.get('http://localhost:5000/api/items');
    return response.data;
  };

  //axios POST
  async postDataAxios(name){
    const headers = {
      'Content-Type': 'application/json'
    }
    const response = await axios.post('http://localhost:5000/api/items',
    {name: name},
    {headers: headers});
    console.log(response.data)
};

  //axios DELETE
  async deleteDataAxios(){
    const id = '5ea7902817d5ac26c4e5d282';
    const response = await axios.delete('http://localhost:5000/api/items/' + id);
    console.log(response.data);
  }

  runExample = async () => {
    const { contract } = this.state;

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  handleChange(event){
    this.setState({newValue: event.target.value});
  }

  async handleSubmit(event){
    event.preventDefault();
    console.log(this.state.newValue);
    const { accounts, contract } = this.state;
    await contract.methods.set(this.state.newValue).send({from: accounts[0]});
    const response = await contract.methods.get().call();
    this.setState({storageValue: response});
  }

  handleChangeMongo(event){
    this.setState({itemName: event.target.value});
  }

  async handleSubmitMongo(event){
    event.preventDefault();
    console.log(this.state.itemName);
    await this.postDataAxios(this.state.itemName);
    window.location.reload(false);
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Simple React DAPP</h1>
        <div>The stored value is: {this.state.storageValue}</div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.newValue} onChange={this.handleChange.bind(this)}></input>
          <input type="submit" value="Submit"></input>
        </form>

        <form onSubmit={this.handleSubmitMongo}>
          <input type="text" value={this.state.itemName} onChange={this.handleChangeMongo.bind(this)}></input>
          <input type="submit" value="Submit"></input>
        </form>

        <Items items={this.state.items}></Items>
      </div>
    );
  }
}

export default App;

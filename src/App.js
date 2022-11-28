import React, { Component } from 'react';
import Web3 from 'web3';
import { useState, useEffect } from 'react';
import * as IPFS from 'ipfs-core';
import './App.css';
import logo from './logo.svg';
import Marketplace from './abis/Marketplace.json';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import 'bootstrap/dist/js/bootstrap.min.js';

class App extends Component {
  //load web3 and blockchain data
  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  
  //create instance of web3.js
  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  //load product data
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    
    if(networkData) {
      const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productsCount().call()
      this.setState({ productCount })
  
      const node = await IPFS.create()
    
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        
        const stream = node.cat(product.photo)
        const decoder = new TextDecoder()
        let data = ''
        
        for await (const chunk of stream) {
          data += decoder.decode(chunk, { stream: true })
        }
        
        product.photo = data
        
        this.setState({
          products: [...this.state.products, product]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
    
    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
  }
  
  async createProduct(name, price, description, photo) {
    this.setState({ loading: true })
    const node = await IPFS.create()
    const results = node.add(photo)
    
    for await (const { cid } of results) {
      this.state.marketplace.methods.createProduct(name, price, description,cid.toString()).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
    }
  }
  
  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
  
  render() {
    return (
      <div className="mt-5">
        <header>
          <Navbar account={this.state.account} />
        </header>
        <main role="main" className="container mt-5">
          <div className="container mt-5">
            { 
              this.state.loading
              ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
              : <Main products={this.state.products} createProduct={this.createProduct} purchaseProduct={this.purchaseProduct} />
            }
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;

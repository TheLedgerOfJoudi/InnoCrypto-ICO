import React from "react";
import Web3 from "web3";
class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            network: ""
        }
    }

    componentDidMount() {
        this.loadNet();
    }

    async loadNet() {
        const web3 = new Web3(Web3.givenProvider)
        await web3.eth.net.getNetworkType().then((result) => {
            this.setState({
                network: result
            })
        })
    }

    render() {
        return (
            <div>
                <h1>Welcome to InnoCrypto ICO!</h1>
                <hr />
                <h2>You are on network : {this.state.network}</h2>
                <h3> ICO's info</h3>
            </div>
        )
    }
}

export default Header;
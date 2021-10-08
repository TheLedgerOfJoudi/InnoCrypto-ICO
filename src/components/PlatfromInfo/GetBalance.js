import React from "react";
import Web3 from "web3";
import { ABI, TOKEN_ADDRESS } from "../../config";

class GetBalance extends React.Component {
    constructor() {
        super()
        this.state = {
            address: "",
            numOfTokens: "",
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            address: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const web3 = new Web3(Web3.givenProvider)
        web3.eth.getAccounts().then((accounts => {
            const Contract = new web3.eth.Contract(ABI, TOKEN_ADDRESS)
            Contract.methods.balanceOf(this.state.address).call({ from: accounts[0] })
                .then(res => {
                    this.setState({
                        numOfTokens: res / (10 ** this.props.decimals) + "." + res % (10 ** this.props.decimals)
                    })
                })
        }))
        this.state.submitted = true
    }

    render() {
        if (this.state.submitted) {
            this.state.submitted = false
            return (

                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.address} onChange={this.handleChange} />
                        <br/>                       
                        <button type="submit">Get Balance</button>
                    </form>
                    <h3>
                        this address has {this.state.numOfTokens} InnoCryptos
                    </h3>
                </div>
            )
        }
        else return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder = "address" value={this.state.address} onChange={this.handleChange} />
                <br/>
                <button type="submit">Get Balance</button>
            </form>
        )
    }
}
export default GetBalance;


import React from "react";
import Web3 from "web3";
import { ABI, TOKEN_ADDRESS } from "../../config";

class TransferForm extends React.Component {
    constructor() {
        super()
        this.state = {
            owner: "",
            buyer: "",
            numOfTokens: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })

    }

    handleSubmit(event) {
        event.preventDefault()
        const web3 = new Web3(Web3.givenProvider)
        web3.eth.getAccounts().then(accounts => {
            const Contract = new web3.eth.Contract(ABI, TOKEN_ADDRESS)
            Contract.methods.transferFrom(
                this.state.owner,
                this.state.buyer,
                parseInt(this.state.numOfTokens * 10 ** this.props.decimals))
                .send({ from: accounts[0] }).then(() => { })
        })

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <input type="text"
                    name="owner"
                    placeholder="owner"
                    value={this.state.owner}
                    onChange={this.handleChange}
                />

                <input type="text"
                    name="buyer"
                    placeholder="Buyer"
                    value={this.state.buyer}
                    onChange={this.handleChange}
                />

                <input type="number"
                    name="numOfTokens"
                    placeholder="Amount"
                    value={this.state.numOfTokens}
                    onChange={this.handleChange}
                />
                <br />
                <button type="submit">Transfer tokens</button>
            </form>
        )
    }
}
export default TransferForm

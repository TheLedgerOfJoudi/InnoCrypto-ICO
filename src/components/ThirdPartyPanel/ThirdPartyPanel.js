import React from "react";
import Web3 from "web3";
import { ABI, TOKEN_ADDRESS } from "../../config";
import GetAllowance from "./GetAllowanceForm";
import TransferFromForm from "./TransferFromForm";

class ThirdPartyPanel extends React.Component {
    constructor() {
        super()
        this.state = {
            totalTokenSupply: "",
            decimals: ""
        }
    }

    componentDidMount() {
        this.getDecimals()
        this.getTotalSupply()
    }

    async getTotalSupply() {
        const web3 = new Web3(Web3.givenProvider)
        await web3.eth.getAccounts().then((accounts) => {
            const Contract = new web3.eth.Contract(ABI, TOKEN_ADDRESS)
            Contract.methods.totalSupply().call({ from: accounts[0] })
                .then((res) => {
                    this.setState({
                        totalTokenSupply: res / (10 ** this.state.decimals) + res % (10 ** this.state.decimals)
                    })
                })
        })
    }

    async getDecimals() {
        const web3 = new Web3(Web3.givenProvider)
        await web3.eth.getAccounts().then((accounts) => {
            const Contract = new web3.eth.Contract(ABI, TOKEN_ADDRESS)
            Contract.methods.decimals().call({ from: accounts[0] })
                .then((res) => {
                    this.setState({
                        decimals: res
                    })
                })
        })
    }

    render() {
        return (
            <div>
                <h3> Third party panel </h3>
                <GetAllowance decimals={this.state.decimals} totalTokenSupply={this.state.totalTokenSupply} />
                <br />
                <TransferFromForm />
                <hr />
            </div>
        )
    }
}
export default ThirdPartyPanel
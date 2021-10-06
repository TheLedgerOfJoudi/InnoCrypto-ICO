import React from "react"
import Web3 from "web3"
import { ABI, TOKEN_ADDRESS } from "../../config"

class TokensSoldBar extends React.Component {
    constructor() {
        super()
        this.state = {
            ownerAddress: "",
            ownerBalance: "",
            fetched: false
        }
    }

    componentDidMount() {
        this.getOwnerAddress()
    }

    componentDidUpdate() {
        if (this.state.fetched) {
            this.getOwnerBalance()
            this.setState({
                fetched: false
            })
        }
    }

    async getOwnerAddress() {
        const web3 = new Web3(Web3.givenProvider)
        await web3.eth.getAccounts().then((accounts) => {
            const Contract = new web3.eth.Contract(ABI, TOKEN_ADDRESS)
            Contract.methods.owner()
                .call({ from: accounts[0] }).then((res) => {
                    this.setState({
                        ownerAddress: res,
                        fetched: true
                    })
                }
                )
        })
    }

    async getOwnerBalance() {
        const web3 = new Web3(Web3.givenProvider)
        await web3.eth.getAccounts().then((accounts) => {
            const Contract = new web3.eth.Contract(ABI, TOKEN_ADDRESS)
            Contract.methods.balanceOf(this.state.ownerAddress)
                .call({ from: accounts[0] }).then((res) => {
                    this.setState({
                        ownerBalance: res / (10 ** this.props.decimals) + "." + res % (10 ** this.props.decimals)
                    })
                }
                )
        })
    }
    render() {
        return (
            <div>
                {this.props.totalTokenSupply - this.state.ownerBalance} / {this.props.totalTokenSupply} have been sold!
            </div>
        )
    }

}
export default TokensSoldBar
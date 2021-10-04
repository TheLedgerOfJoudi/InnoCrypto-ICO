import React from "react";
import Web3 from "web3";
import { ABI, TOKEN_ADDRESS } from "../../config";

class BalanceOf extends React.Component{
constructor(){
    super()
    this.state = {
        address:"",
        numOfTokens:"",
        decimals : ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}

handleChange(event){
this.setState({
    address : event.target.value
})
}

handleSubmit(event){
    event.preventDefault()
    const web3 = new Web3(Web3.givenProvider)
    web3.eth.getAccounts().then((accounts => {
        const Contract = new web3.eth.Contract(ABI, TOKEN_ADDRESS)
        Contract.methods.balanceOf(this.state.address).call({from : accounts[0]})
        .then(res => {
            this.setState({
                numOfTokens : res / (10 ** this.props.decimals) + "." + res % (10 ** this.props.decimals)
            })
        })
    }))
}

render(){
    return(
        <div>
        <form onSubmit = {this.handleSubmit}>
            <input type = "text" value = {this.state.address} onChange = {this.handleChange}/>
            <button type = "submit">Get Balance</button>
        </form>
        <h3>
            this address has {this.state.numOfTokens} InnoCryptos
        </h3>
        </div>
    )
}
}
export default BalanceOf;


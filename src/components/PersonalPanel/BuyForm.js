import React from "react";
import Web3 from "web3";
import { ABI, TOKEN_ADDRESS } from "../../config";
class BuyForm extends React.Component{
    constructor(){
        super()
        this.state = {
            numOfTokens:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
        
    }

    handleSubmit(event){
        event.preventDefault()
        
        let messageValue = parseInt(this.state.numOfTokens * 10**5)
        messageValue /= 10 ** this.props.decimals
        const web3 = new Web3(Web3.givenProvider)
        web3.eth.getAccounts().then((accounts)=>{
            const Contract = new web3.eth.Contract(ABI, TOKEN_ADDRESS)
            console.log(parseInt(this.state.numOfTokens * 10**5))
            Contract.methods.buy(parseInt(this.state.numOfTokens * 10 ** 5))
            .send({from:accounts[0], value : messageValue *  0.0025 * 10 ** 18}).then((res) => {
                console.log(res)
            })
        })
    }

    render(){
        return(
            <form onSubmit = {this.handleSubmit}>
                <input type = "number"
                name = "numOfTokens"
                placeholder = "Tokens to buy"
                value = {this.state.numOfTokens}
                onChange = {this.handleChange}
                >
                </input>
                <br/>
                <button type = "submit">Buy</button>
            </form>
        )
    }
}
export default BuyForm
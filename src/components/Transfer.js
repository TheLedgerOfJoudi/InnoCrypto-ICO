import React from "react";
import Web3 from "web3";
import { ABI, TOKEN_ADDRESS } from "../config";

class Transfer extends React.Component{
    constructor(){
        super()
        this.state = {
            receiver:"",
            numOfTokens:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        const {name , value} = event.target
        this.setState({
            [name] : value
        })
       
    }

    handleSubmit(event){
        event.preventDefault()
        const web3 = new Web3(Web3.givenProvider)
        web3.eth.getAccounts().then(accounts =>{
            const Contract = new web3.eth.Contract(ABI, TOKEN_ADDRESS)
            Contract.methods.transfer(this.state.receiver, this.state.numOfTokens)
            .send({from : accounts[0]}).then(() => {})
        })

    }

    render(){
        return(
        <form onSubmit = {this.handleSubmit}>
            <input type = "text" 
            name = "receiver"
            placeholder = "To whom you want to send" 
            value = {this.state.receiver} 
            onChange = {this.handleChange}
            />
            
            <input type = "text"
            name = "numOfTokens" 
            placeholder = "How much are you willing to send" 
            value = {this.state.numOfTokens}
            onChange = {this.handleChange}
            />
            <br/>
            <button type = "submit">Transfer tokens</button>
        </form>
        )
    }
}
export default Transfer
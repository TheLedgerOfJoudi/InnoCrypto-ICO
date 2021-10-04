import React from "react";
import Web3 from "web3";
import {ABI, TOKEN_ADDRESS} from  "../../config"
class GetAllowance extends React.Component{
    constructor(){
        super()
        this.state = {
            owner:"",
            delegate:"",
            allowance:""
        }
    }

    handleChange(event){
        const {name,value} = event.target
        this.setState({
            [name] : value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        const web3 = new Web3(Web3.givenProvider)
        web3.eth.getAccounts().then((accounts)=>{
            const Contract = new web3.eth.Contract(ABI, TOKEN_ADDRESS)
            Contract.methods.allowance(this.state.owner,this.state.delegate)
            .then((res)=>{
                this.setState({
                    allowance : res
                })
            })
        })
    }

    render(){
        return(
            <div>
        <form onSubmit = {this.handleSubmit}>
            <input type = "text"
            name = "owner"
            placeholder = "owner"
             value = {this.state.owner}
              onChange = {this.handleChange}/>

              <input type = "text"
              name = "delegate"
            placeholder = "delegate"
             value = {this.state.delegate}
              onChange = {this.handleChange}/>

            <button type = "submit">Get Allowance</button>
        </form>
        <h3>
            the owner has allowed the delegate {this.state.allowance} InnoCryptos
        </h3>
        </div>
        )
    }
}
export default GetAllowance
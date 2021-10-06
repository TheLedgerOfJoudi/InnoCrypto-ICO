import React from "react";
import Web3 from "web3";
import TransferForm from "./TransferForm";
import ApproveForm from "./ApproveForm"
import BuyForm from "./BuyForm";
import {ABI, TOKEN_ADDRESS} from "../../config"
class MyPanel extends React.Component{
constructor(){
    super()
    this.state = {
        decimals:""
    }
}

componentDidMount(){
this.getDecimals()
}

async getDecimals (){
    const web3 = new Web3(Web3.givenProvider)
     await web3.eth.getAccounts().then((accounts)=>{
        const Contract = new web3.eth.Contract(ABI, TOKEN_ADDRESS)
        Contract.methods.decimals().call({from:accounts[0]})
        .then((res)=>{
            this.setState({
                decimals : res
            })
        })
    })
    }

render(){
    return(
        <div>
        <h3>My panel</h3>
        <TransferForm/>
        <br/>
        <ApproveForm/>
        <br/>
        <BuyForm decimals = {this.state.decimals} />
        <hr/>
        </div>
    )
}
}
export default MyPanel
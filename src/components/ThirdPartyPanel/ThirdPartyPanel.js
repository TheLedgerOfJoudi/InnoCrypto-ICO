import React from "react";
import ApproveForm from "./ApproveForm";
import GetAllowance from "./GetAllowanceForm";
import TransferFromForm from "./TransferFromForm";

class ThirdPartyPanel extends React.Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div>
                <GetAllowance/>
                <br/>
                <ApproveForm/>
                <br/>
                <TransferFromForm/>
                <hr/>
            </div>
        )
    }
}
export default ThirdPartyPanel
import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import ProductList from "./ProductList";

const PAGE_USER = "PAGE_USER"
const PAGE_PRODUCT = "PAGE_PRODUCT"

const Admin = () => {
    const [pageToDisplay, setPageToDisplay] = useState("user")

     useEffect(()=>{
        setPageToDisplay(<UserList/>);
        //console.log("Change is happening! page is",pageToDisplay)
     },[])
    
    const handleChange = (evt) => {
        document.querySelectorAll('.tab-button').forEach(e => e.classList.remove("selected"))
        evt.target.classList.add("selected")
        switch(evt.target.name){
            case PAGE_USER:
                setPageToDisplay(<UserList/>);
                break;
            case PAGE_PRODUCT:
                setPageToDisplay(<ProductList/>);
                break;
            default:
                setPageToDisplay(<UserList/>);
        }
    }

    return (
        <div className="admin-page">
            <div className="page-tab">
                <button className="tab-button selected" name={PAGE_USER} onClick={handleChange}>Users</button>
                <button className="tab-button" name={PAGE_PRODUCT} onClick={handleChange}>Products</button>
            </div>
            <div className="tab-content">
                {pageToDisplay}
            </div>
        </div>
    )
}

export default Admin;
import axios from "axios";
import React, { useState } from "react";
import { TOKEN } from "../../store/auth";


const AddProduct = (props) => {

    const [product, updateProduct] = useState({ price: 100, validToAdd: false })

    const handleChange = (evt) => {

        let product_changes = { ...product, [evt.target.name]: evt.target.value }
        let okToAdd = false
        if (!!product_changes.imageurl && !!product_changes.itemType && !!product_changes.brand & !!product_changes.price) okToAdd = true
        console.log("ok to add",okToAdd)
        updateProduct({ ...product_changes, validToAdd: okToAdd })
    }

    const submitProduct = async () => {
        
        const token = window.localStorage.getItem(TOKEN)
        await axios.post('api/admin/products', { ...product }, {
            headers: {
                authorization: token
            }
        })
        updateProduct({ 
            imageurl:'', 
            itemType:'', 
            brand:'', 
            model:'',
            description:'', 
            price: 100, 
            validToAdd: false});
        props.refreshList();
    }

    return (
        <tr>
            <td width="100px">
                {<input className="info-table-input small-input" type="url" name="imageurl" value={product.imageurl} placeholder="Image URL" onChange={handleChange} required />}
                <img src={product.imageurl} />
            </td>
            <td>{<input className="info-table-input" type="text" name="itemType" value={product.itemType} placeholder="Item Type..." onChange={handleChange} required />}</td>
            <td>{<input className="info-table-input" type="text" name="brand" value={product.brand} placeholder="Brand..." onChange={handleChange} required />}</td>
            <td>{<input className="info-table-input" type="text" name="model" value={product.model} placeholder="Model..." onChange={handleChange} />}</td>
            <td>{<textarea className="info-table-input" rows="2" name="description" cols="25" value={product.description} placeholder="Description..." onChange={handleChange} />}</td>
            <td>{<input className="info-table-input" type="number" name="price" step="100" min="100" value={product.price} onChange={handleChange} required />}</td>
            <td>
                <button disabled={product ? !product.validToAdd : true} className="info-table-button" onClick={submitProduct}>Add Product</button>
            </td>

        </tr>)
}

export default AddProduct;
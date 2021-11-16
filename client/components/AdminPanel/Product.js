import { render } from "enzyme";
import React, { useState } from "react";
import { TOKEN } from "../../store/auth";
import axios from "axios";


const Product = (props) => {

    const [product, updateProduct] = useState({ ...props.product, changesMade: false })

    const handleChange = (evt) => {
        updateProduct({ ...product, [evt.target.name]: evt.target.value, changesMade: true })
    }


    const saveChanges = async () => {
        updateProduct({...product, changesMade: false})
        const token = window.localStorage.getItem(TOKEN)
        await axios.put('/api/admin/products', { ...product }, {
            headers: {
                authorization: token
            }
        })
        
    }

    const deleteProduct = async () => {
        props.removeFromList(product);
        const token = window.localStorage.getItem(TOKEN)
        await axios.delete('/api/admin/products', {
            headers: {
                authorization: token
            },
            data:{...product}
        })
        
    }

    return (
        <tr>
            <td width="100px">
            {<input className="info-table-input small-input" type="url" name="imageurl" value={product.imageurl} placeholder="Image URL" onChange={handleChange}/>}
                <img src={product.imageurl} />
            </td>
            <td>{<input className="info-table-input" type="text" name="itemType" value={product.itemType} placeholder="Item Type..." onChange={handleChange} />}</td>
            <td>{<input className="info-table-input" type="text" name="brand" value={product.brand} placeholder="Brand..." onChange={handleChange} />}</td>
            <td>{<input className="info-table-input" type="text" name="model" value={product.model} placeholder="Model..." onChange={handleChange} />}</td>
            <td>{<textarea className="info-table-input" rows="2" name="description" cols="25" value={product.description} placeholder="Description..." onChange={handleChange} />}</td>
            <td>{<input className="info-table-input" type="number" name="price" step="100" min="100" value={product.price} onChange={handleChange} />}</td>
            <td>
                <button disabled={product ? !product.changesMade : true} className="info-table-button" onClick={saveChanges}>Save Changes</button>
                <button className="info-table-button delete-button" onClick={deleteProduct}>Delete</button>
            </td>
        </tr>);
}

export default Product;
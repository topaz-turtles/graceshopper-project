import axios from "axios";
import React, { useEffect, useState } from "react";
import { TOKEN } from "../../store/auth";
import Product from "./Product";
import AddProduct from "./AddProduct";

const ProductList = () => {

    const [productList, setProductList] = useState([]);

    const refreshList = () => {
        const fetchProducts = async () => {
            const token = window.localStorage.getItem(TOKEN)
            const { data } = await axios.get('/api/admin/products', {
                headers: {
                    authorization: token
                }
            })
            setProductList(data)
        }

        try {
            fetchProducts()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        refreshList();
    }, [])

    const removeFromList = (product) => {
        setProductList(productList.filter(element => element.id !== product.id))
    }



    return (
        <table className="info-table">
            <tr className="info-table-row">
                <th>Preview</th>
                <th>Type</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
            </tr>
            <AddProduct refreshList={refreshList}/>
            {productList.map(product =>
                <Product product={product} removeFromList={removeFromList} />
            )}
        </table>);
}

export default ProductList;
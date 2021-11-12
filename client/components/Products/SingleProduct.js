import React, { useEffect, useState } from "react";
import axios from "axios";


const SingleProduct = (props) => {

    
    const [product, setProduct] = useState({});
    console.log("On Top:",product)

    useEffect(()=>{

        const getProduct = async () => {

            try {
                const {data} = await axios.get(`/api/products/${props.match.params.id}`)
                setProduct(data)
                console.log("After Set:",product)
            } catch (error) {
                console.error(error)
            }
            
        }

        getProduct()
    },[])

    return(
        <div className="single-product">
            <h2>{`${product.brand} ${product.itemType} ${product.model?', '+product.model:''}`}</h2>
            <img src={product.imageurl} />
            <h3>{'$'+(product.price/100).toFixed(2)}</h3>
            <div className="single-product-detail">
                <button>Add To Cart</button>
            </div>
        </div>
    )

}

export default SingleProduct;
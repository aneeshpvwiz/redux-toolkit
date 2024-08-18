import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import Alert from 'react-bootstrap/Alert'
import statusCodes from "../utils/statusCodes";


const Product = () => {

    const dispatch = useDispatch()
    const {data: products, status} = useSelector(state=>state.products)

    useEffect(()=>{
        dispatch(getProducts())
    
    },[])

    const addToCart = (payload) => {
        dispatch(add(payload))


        
    }
    
    if (status === statusCodes.LOADING) {
        return <p>Loading...</p>
    }

    if (status === statusCodes.ERROR) {
        return <Alert variant='danger' key='danger'>Something went wrong. Please try again!</Alert>
    }


    const cards = products.map(product => (
        <div className="col-md-3">
            <Card style={{ width: '18rem' }} key={product.id} className="h-100">
                <div className="text-center">
                    <Card.Img variant="top" src={product.image} style = {{width:'100px', height:'130px'}}/>
                </div>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        INR: {product.price}
                    </Card.Text>
                    <Button variant="primary" onClick = {()=>addToCart(product)}>Add To Cart</Button>
                </Card.Body>
            </Card>
        </div>
    ))
    return (
        <>
        <h1>Product Page</h1>
        <div className="row">
            {cards}
        </div>

        </>
    )
}

export default Product;
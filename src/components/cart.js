import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { remove } from '../store/cartSlice';

const Cart = ()=>{
    const productCarts = useSelector(state=>state.cart)
    const dispatch = useDispatch()

    const removeFromCart = (id) => {
        dispatch(remove(id))


    }


    const cards = productCarts.map(product => (
        <div className="col-md-12">
            <Card style={{ width: '18rem' }} key={product.id} className="h-100">
                <div className="text-center">
                    <Card.Img variant="top" src={product.image} style = {{width:'100px', height:'130px'}}/>
                </div>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        INR: {product.price}
                    </Card.Text>
                    <Button variant="danger" onClick={()=>removeFromCart(product.id)} >Remove Item</Button>
                </Card.Body>
            </Card>
        </div>
    ))

    return (
        <>
        <h2>Cart Page</h2>
        <div className="row">
            {cards}
        </div>
        </>
    )
}

export default Cart
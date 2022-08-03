import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Col, Stack, Alert} from "react-bootstrap";
import { useCart } from "react-use-cart";
import { useState, useEffect} from "react"

const ProductCard = (props) => {

	const { addItem } = useCart()

	// console.log(props.productProp._id)

	const [myProduct, setMyProduct] = useState()


	useEffect(() => {
	setMyProduct({
	  id: props.id,
	  imageURL: props.image,
	  name: props.title,
	  description: props.description,
	  price: props.price,
	  stocks: props.stocks
	});
	}, []);

	// console.log(myProduct)

	return(
		
			<Col xs={12} md={3}>
				
				    <Card border="primary" className="cardHighlight my-4">
				    	<Card.Img variant="top" src={`https://drive.google.com/uc?export=view&id=${props.productProp.imageURL}`} className="img-fluid"/>
				        <Card.Body>
					        <Card.Title className="fw-bold text-success text-center">{props.title}</Card.Title>
				           	<Card.Header className="fw-bold text-success text-center">{props.name}</Card.Header>
				            <Card.Text style={{fontSize:"16px"}}>{props.description}</Card.Text>  
					        </Card.Body>
				        <Card.Footer className="text-center p-3">
				        	<div className="container mb-2">
				                <Card.Text className="fw-bold text-center text-primary">
				    	               Price: &#8369;{props.price}<br/>
				    	               Stocks: {props.stocks}
				    	        </Card.Text>
				        	</div>

				        	
				        	<Button className="btn btn-success" size="sm"  onClick={() => addItem(myProduct)}>Add to Cart</Button>

				        	<Button as={Link} to={`/products/${props.id}`} size="sm" className="margin-left" variant="danger">Buy Now</Button>
				        </Card.Footer>
				    </Card>
			
			</Col>
		
	)
}

export default ProductCard
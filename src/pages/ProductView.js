import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import UserContext from "../UserContext";

export default function ProductView(){

	//To check if their is already a logged in user. Change the button from "Enroll" to "Login" if the user is not logged in.
	const { user } = useContext(UserContext);

	//Allow us to gain access to methods that will redirect a user to different page after enrolling a product.
	const navigate = useNavigate();

	// "useParams" hook allows us to retrieve the productId passed via URL.
	const { productId } = useParams();

	// Create state hooks to capture the information of a specific product and display it in our application.
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");

	const addOrder = (productId) => {
		fetch(`${process.env.REACT_APP_API_URL}/users/addOrder`,{
			method: "POST",
			headers:{
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				
				productId: productId,
				productName: name,
				userId: user.id,
				price: price,
				quantity: 1
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data === true){
				Swal.fire({
					title: "Succesfully",
					icon: "success",
					text: `You have successfully ordered this product ${productId}`
				})
				navigate("/showorder");
			}
			else{
				Swal.fire({
					title: "Something went wrong!",
					icon: "error",
					text: "Please try again."
				})
			}
		})
	}

	useEffect(() =>{
		console.log(productId);

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setName(data.name);
			setImage(data.imageURL);
			setDescription(data.description);
			setPrice(data.price);
		})

	}, [productId])

	return(
		
		<Container className="mt-5">
			<Row>
			<div className="container-fluid">
				<Col lg={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Img variant = "top" src={`https://drive.google.com/uc?export=view&id=${image}`} />

						</Card.Body>
						<Card.Body className="text-center">
							<Card.Title className="fw-bold">{name}</Card.Title>
							<Card.Text>{description}</Card.Text>
							<Card.Text className="fw-bold">PhP {price}</Card.Text>
							<div className="d-grid gap-2">
							{
								(user.id !== null)
								?
								<Button size="sm" className="margin-left" variant="danger" variant="primary" size="lg" onClick={() => addOrder(productId)}>Buy Now</Button>
								:
								<Button as={Link} to="/login" variant="primary" size="lg">Please Login To Order</Button>
							}
							</div>
						</Card.Body>		
					</Card>
				</Col>
				</div>
			</Row>
		</Container>
		
	)
}

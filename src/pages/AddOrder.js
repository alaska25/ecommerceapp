// import { Table, Button, Form, Modal, Container, Navbar, NavbarBrand, Nav, NavItem } from 'react-bootstrap';

// import { useState, useEffect, useContext } from "react";

// import UserContext from "../UserContext"

// import { Navigate, Link } from "react-router-dom";

// import Swal from "sweetalert2"



// export default function AddOrder(){

// 	// Modal
// 	const [ show, setShow ] = useState(false);
//   	const handleClose = () => setShow(false);
//   	const addProduct = () => setShow(true);

//   	// useContect
// 	const { user } = useContext(UserContext)


// 	// useState
// 	const [allProducts, setAllProducts] = useState([]);
// 	const [name, setName] = useState("");
// 	const [description, setDescription] = useState("");
// 	const [price, setPrice] = useState(0);
// 	const [stocks, setStocks] = useState(0);

// 	// "fetchData()" wherein we can invoke if their is a certain change with the course
// 	const fetchData = () => {
// 		fetch(`${process.env.REACT_APP_API_URL}/products/allOrder`,
// 		{
// 			headers: {
// 				'Authorization': `Bearer ${localStorage.getItem("token")}`
// 				}
// 		})
// 		.then(res => res.json())
// 		.then(data => {
// 				console.log(data)
// 			setAllProducts(data.map(product => {

// 				return(
// 					<tr key={product._id}>
// 						{/*<ProductData product={product} />*/}
// 					</tr>
// 				)
// 			}))
// 		})
// 	}



// 	// onClick product function for add product
// 	function product(e){

// 		//prevents the page redirection via form submit
// 		e.preventDefault();

// 		fetch(`${process.env.REACT_APP_API_URL}/products`, {
// 			method: "POST",
// 			headers:{
// 				"Content-Type": "application/json",
// 				"Authorization": `Bearer ${localStorage.getItem("token")}`
// 			},
// 			body: JSON.stringify({
// 				name: name,
// 				description: description,
// 				price: price,
// 				stocks: stocks
// 			})
// 		})
// 		.then(res => res.json())
// 		.then(data => {
// 			if(data){
// 				Swal.fire({
// 					title: "Successfully added",
// 					icon: "success",
// 					text: "You have successfully added new product"
// 				});

// 				fetchData();
// 			}
// 			else{
// 				Swal.fire({
// 					title: "Something went wrong",
// 					icon: "error",
// 					text: "Please try again!."
// 				});
// 			}
// 		})		
// 	}


// 	useEffect(() => {
// 		fetchData();
// 	}, [])

// 	return(

// 		(user.isAdmin)
// 		?
// 		<>
// 			<Container className="pt-3">

// 				<Navbar >
// 					<Container>
// 						<NavbarBrand><h1 className="header-admin">Order Dashboard</h1></NavbarBrand>
// 						<Nav>
// 							<NavItem>
// 								<Button variant="primary" size="sm" as={Link} to={`/admin`} className="mx-2">Products</Button>
// 								<Button variant="success" size="sm" as={Link} to={`/order`} className="mx-2">Orders</Button>
// 							</NavItem>
// 						</Nav>
						
// 					</Container>
// 				</Navbar>

// 				{/*Table Start*/}
// 				<Table striped bordered hover>
// 				    <thead>
// 				        <tr>
// 				          	<th>Product ID</th>
// 				          	<th>Product Name</th>
// 				          	<th>Description</th>
// 				          	<th>Price</th>
// 				          	<th>Stocks</th>
// 				          	<th>Status</th>
// 				          	<th>Action</th>
// 				        </tr>
// 				    </thead>
// 				    <tbody>
// 				        { allProducts }
// 				    </tbody>
// 				</Table>

// 			</Container>

// 		</>
// 		:
// 		<Navigate to="/products" />
// 	)
// }

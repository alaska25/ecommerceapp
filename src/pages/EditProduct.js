import { useState, useEffect, useContext } from 'react';
import { Navigate, Link, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Form, Button } from 'react-bootstrap';

export default function EditProduct() {

	const {user} = useContext(UserContext);

	//get the courseId to be updated in the URL
	const { productId } = useParams();

	const navigate = useNavigate();

	// State hooks to store the values of the input fields
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
    const [stocks, setStocks] = useState(0);

    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(false);

	// This function will be trigger upon clicking the Save button, and will save the update in the database
	function editProduct(e) {

		// Prevents page redirection via form submission
	    e.preventDefault();

	    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
	    	method: "PUT",
	    	headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
			    name: name,
			    description: description,
			    price: price,
			    stocks: stocks
			})
	    })
	    .then(res => res.json())
	    .then(data => {
	    	console.log(data);

	    	if(data){
	    		Swal.fire({
	    		    title: "Product succesfully Updated",
	    		    icon: "success",
	    		    text: `${name} is now updated`
	    		});

	    		navigate("/admin");
	    	}
	    	else{
	    		Swal.fire({
	    		    title: "Error!",
	    		    icon: "error",
	    		    text: `Something went wrong. Please try again later!`
	    		});
	    	}

	    })

	    // Clear input fields
	    setName('');
	    setDescription('');
	    setPrice(0);
	    setStocks(0);

	}

	// Submit button validation
	useEffect(() => {

        // Validation to enable submit button when all fields are populated and set a price and slot greater than zero.
        if(name != "" && description != "" && price > 0 && stocks > 0){
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [name, description, price, stocks]);

	//To get the information of the product to be updated.
    useEffect(()=> {

    	console.log(productId);

    	fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
    	.then(res => res.json())
    	.then(data => {

    		console.log(data);

    		// Changing the initial state of the following to the information of the product to be edited.
    		setName(data.name);
    		setDescription(data.description);
    		setPrice(data.price);
    		setStocks(data.stocks);

    	});

    }, [productId]);

    return (
    	user.isAdmin
    	?
			<>
			<div className="container">	
		    	<h1 className="my-5 text-center">Edit Product</h1>
		        <Form onSubmit={(e) => editProduct(e)} >
		        	<Form.Group controlId="name" className="mb-3">
		                <Form.Label>Product Name</Form.Label>
		                <Form.Control 
			                type="text" 
			                placeholder="Enter Product Name" 
			                value = {name}
			                onChange={e => setName(e.target.value)}
			                required
		                />
		            </Form.Group>

		            <Form.Group controlId="description" className="mb-3">
		                <Form.Label>Product Description</Form.Label>
		                <Form.Control
		                	as="textarea"
		                	rows={3}
			                placeholder="Enter Product Description" 
			                value = {description}
			                onChange={e => setDescription(e.target.value)}
			                required
		                />
		            </Form.Group>

		            <Form.Group controlId="price" className="mb-3">
		                <Form.Label>Product Price</Form.Label>
		                <Form.Control 
			                type="number" 
			                placeholder="Enter Product Price" 
			                value = {price}
			                onChange={e => setPrice(e.target.value)}
			                required
		                />
		            </Form.Group>

		            <Form.Group controlId="stocks" className="mb-3">
		                <Form.Label>Product Stocks</Form.Label>
		                <Form.Control 
			                type="number" 
			                placeholder="Enter Product Stocks" 
			                value = {stocks}
			                onChange={e => setStocks(e.target.value)}
			                required
		                />
		            </Form.Group>

		            {/* conditionally render submit button based on isActive state */}
	        	    { isActive 
	        	    	? 
	        	    	<Button variant="primary" type="submit" id="submitBtn">
	        	    		Update
	        	    	</Button>
	        	        : 
	        	        <Button variant="danger" type="submit" id="submitBtn" disabled>
	        	        	Update
	        	        </Button>
	        	    }
	        	    	<Button className="m-2" as={Link} to="/admin" variant="success" type="submit" id="submitBtn">
	        	    		Cancel
	        	    	</Button>
		        </Form>
		    </div>
	    	</>
    	:
    	    <Navigate to="/products" />
	    	
    )

}

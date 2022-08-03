import {useState, useEffect, useContext} from "react";
import UserContext from "../UserContext";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Login(){

	// Allows us to consume the User Context object and it's properties to use for the user validation.
		//we have now have the access in te user state created in the app.js.
		//"user" value will be used for the conditional rendering.
		//"setUser" will be used for updating the global user state in the app.js
	const {user, setUser} = useContext(UserContext);

	//State hooks to store the values of the input fields
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//State to determine whether the button is enabled or not
	const [isActive, setIsActive] = useState(false);

	function login(e){
		//prevents the page redirection via form submit
		e.preventDefault();

		// Process a fetch request to the corresponding backend API.
			//Syntax:
				// fetch("url", {options})
					// Convert the information retrieved from the backend into a JavaScript object.
				// .then(res => res.json())
					// Capture the converted data.
				// .then(data => {})
		fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				// values are coming from our State hooks
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data =>{

			if(typeof data.access !== "undefined"){
				localStorage.setItem("token", data.access);
				retrieveUserDetails(data.access);

				Swal.fire({
					title: "Login Successful",
					icon: "success",
					text: "Welcome Back User!"
				});
			}
			else{
				Swal.fire({
					title: "Authentication Failed",
					icon: "error",
					text: "Check your login details and try again."
				});
			}

		})

		// "localStorage" is a property that allows JavaScript sites and apps to save key-value pairs in a web browser with no expiration date.
			// Syntax: localStorage.setItem("propertyName", value);

		// Set the email of the authenticated user in the local storage 
			//Storing Information in the local storage make the data persistent even as page is refreshed.
		// localStorage.setItem("email", email);

		// Set the global user state (located in the app.js) to be set with the properties obtained from local storage.
		// setUser({
		// 			//email used upon logging in.
		// 	email: localStorage.getItem("email")
		// })

		//Clear input fields
		setEmail("");
		setPassword("");

		// alert(`${email} has been verified! Welcome back!`);

	}

	//Retrieve user details
	// we will get the payload from the token.
	const retrieveUserDetails = (token) => {
		fetch(`${process.env.REACT_APP_API_URL}/users/details`,{
			headers:{
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			//This will be set to the user state.
			setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})
		})
	}

	useEffect(() =>{
		// Validation to enable the submit button when all fields are populated.
		if(email !== "" && password !== ""){
			setIsActive(true)
		}
		else{
			setIsActive(false)
		}
	}, [email, password])

	return(
		// Conditional rendering is applied in the Login pages that will determine which component/page will be loaded if the user is already login.
		(user.id !== null)
		?	
			// Redirected to the /products endpoint.
			<Navigate to="/admin"/>
		:
		<>
		<div className="container-fluid bg-image1">
			<div>
				<h1 className=" text-light text-center">Log In</h1>
			</div>
			<div className="d-flex justify-content-center container align-items-center my-5">
				<Form className="rounded p-4 border text-light bg-dark" onSubmit ={(e) => login(e)}>
					<Form.Group className="mb-3" controlId="userEmail">
					  <Form.Label>Email address</Form.Label>
					  <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
					  <Form.Text className="text-muted">
					    We'll never share your email with anyone else.
					  </Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="password">
					  <Form.Label>Password</Form.Label>
					  <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
					</Form.Group>
						
					{
						isActive
						?
						<div className="d-grid gap-2">
							<Button variant="danger" type="submit" id="submitBtn">
							  Log In
							</Button>
						</div>
						:
						<div className="d-grid gap-2">
							<Button variant="primary" type="submit" id="submitBtn" disabled>
							  Log In
							</Button>
						</div>
					}
					<p className="text-light text-center mt-2">Not a member yet? <a href="http://localhost:3000/register">Sign Up here</a></p>
					<Button as={Link} to="/" type="submit" variant="danger" id="submitBtn" size="sm" className="mt-3">
					  Cancel
					</Button>
			
				</Form>
			</div>
		</div>
		</>
	
	)
}

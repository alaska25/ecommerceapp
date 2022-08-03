import {useState, useEffect, useContext} from "react";
import UserContext from "../UserContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Form, Button } from "react-bootstrap";


export default function Register(){

	const {user} = useContext(UserContext);
	const navigate = useNavigate();
	
	// State hooks to store the values of the input fields
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");

	// Check if the values are successfully binded/passed.
	console.log(firstName);
	console.log(lastName);
	console.log(email);
	console.log(mobileNo);
	console.log(password1);
	console.log(password2);

	//Function to simulate user registration
	function registerUser(e){
		//prevents the page redirection via form submit
		e.preventDefault();

		// Checking if the email is still available
		fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`,{
			method: "POST",
			headers:{
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data){
				Swal.fire({
						title: "Duplicate email found",
						icon: "error",
						text: "Kindly provide another email to complete for registration."
					});
			}
			else{
				fetch(`${process.env.REACT_APP_API_URL}/users/register`,{
					method: "POST",
					headers:{
						"Content-Type":"application/json"
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						mobileNo: mobileNo,
						password: password1
					})
				})
				.then(res => res.json())
				.then(data => {
					console.log(data)
					if(data){
						// Clear input fields
						setFirstName("");
						setLastName("");
						setMobileNo("");
						setEmail("");
						setPassword1("");
						setPassword2("");

						Swal.fire({
							title: "Registration Successful",
							icon: "success",
							text: "Start Shopping Now!"
						})

						// Redirect to the login page after registration.
						navigate("/login");
					}
					else{
						Swal.fire({
							title: "Something went wrong!",
							icon: "error",
							text: "Please try again!"
						})
					}
				})
			}
		})
		// Clear input fields
		setFirstName("");
		setLastName("");
		setMobileNo("");
		setEmail("");
		setPassword1("");
		setPassword2("");


		
		// alert("Thank you for registering!");

		// email = "";
		// password1 = "";   const cannot reassign
		// password2 = "";


	}


	//State to determine whether submit button is enabled or not.
	const [isActive, setIsActive] = useState(false);

	// To enable the submit button:
		// No empty input fields.
		//Password and verify password should be the same.
	useEffect(()=>{
			if((firstName !== "" && lastName !== "" && email !== "" && mobileNo.length === 11 && password1 !== "" && password2 !== "") && (password1 === password2)){
				setIsActive(true);
			}
			else{
				setIsActive(false);
			}
		},[firstName, lastName, email, mobileNo, password1, password2])

	/*
			Two Way Binding
				- is a way to assure that we can save the input into our states as we type into the input element.

				Syntax:
					<Form.Control type="inputType" value={inputState} onChange={e => {setInputState(e.target.value)}}

						Note:
							- We set the value of the input type to the initialState. We cannot type into our inputs anymore because there is now a value bound to it.
							- The "onChange" event is added to be able to updated the state bound in the input.

					e = event, contains all the details about the event.

					e.target = target is the element WHERE the event happened.

					e.target.value = the current value of the element WHERE the event happened.
		*/


	return(

		(user.id !== null)

		?
			//Redirected to the /courses endpoint.
			<Navigate to="/products"/>
		:

		<>
				<div className="container bg-image1 responsive">	
					<h1 className=" text-center text-light">Sign Up</h1>
					<p className=" text-center text-light">It's Quick and Easy!</p>

					<div className="d-flex justify-content-center align-items-center">		
					<Form className="rounded p-6 border p-sm-3 text-light bg-dark" onSubmit = {(e) => registerUser(e)}>

						<Form.Group className="mb-3" controlId="firstName">
						  <Form.Label>First Name</Form.Label>
						  <Form.Control type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="lastName">
						  <Form.Label>Last Name</Form.Label>
						  <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="mobileNo">
						  <Form.Label>Mobile Number</Form.Label>
						  <Form.Control type="number" placeholder="Mobile Number" value={mobileNo} onChange={e => setMobileNo(e.target.value)}/>
						</Form.Group>

					      <Form.Group className="mb-3" controlId="userEmail">
					        <Form.Label>Email address</Form.Label>
					        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
					        <Form.Text className="text-muted">
					          We'll never share your email with anyone else.
					        </Form.Text>
					      </Form.Group>

					      <Form.Group className="mb-3" controlId="password1">
					        <Form.Label>Password</Form.Label>
					        <Form.Control type="password" placeholder="Password" value={password1} onChange={e => setPassword1(e.target.value)}/>
					      </Form.Group>

					      <Form.Group className="mb-3" controlId="password2">
					        <Form.Label>Verify Password</Form.Label>
					        <Form.Control type="password" placeholder="Verify Password" value={password2} onChange={e => setPassword2(e.target.value)}/>
					      </Form.Group>
				      
				      {
				      	isActive
				      	?
				      		<div className="d-grid gap-2">
				      		<Button variant="danger" type="submit" id="submitBtn">
				      		  Sign Up
				      		</Button>
				      		</div>
				      	:
				      		<div className="d-grid gap-2">

				      		<Button variant="primary" type="submit" id="submitBtn" disabled>
				      		  Sign Up
				      		</Button>
				      		</div>
				      }
				    <p className="text-light text-center mt-2">Already registered? <a href="http://localhost:3000/login">Log In here</a></p>
				    <Button as={Link} to="/" type="submit" variant="danger" id="submitBtn" size="sm" className="mt-3">
					  Cancel
					</Button>


				    </Form>
				    </div>
				</div>
		</>
	)
}
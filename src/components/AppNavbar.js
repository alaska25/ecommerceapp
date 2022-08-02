import { Link } from "react-router-dom";
import {useState, useContext} from "react";
import UserContext from "../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faList, faAddressCard, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";

export default function AppNavbar(){

	const {user} = useContext(UserContext);

	// State hook to store the information stored in the login page.
									//null
	// const [user, setUser] = useState(localStorage.getItem("email"));
	// console.log(user);
	/*
		- The "as" prop allows components to be treated as if they are a different component gaining access to it's properties and functionalities.
		- The "to" prop is used in place of the "href" prop for providing the URL for the page.
		- "defaultActiveKey" & "eventKey" is used to highlight the active NavLink component that matches the URL.

	*/

	return(
	    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
	          <Container>
	           	<Navbar.Toggle aria-controls="responsive-navbar-nav" />
	            <Navbar.Collapse id="responsive-navbar-nav">
	              	<Nav className="me-auto" defaultActiveKey="/">
	              	<Nav.Link as={Link} to="/" eventKey="/">AV-Shop</Nav.Link>
	              	
	           	</Nav>
	            <Nav>
	            	<Nav.Link as={Link} to="/" eventKey="/"><FontAwesomeIcon icon={faHome} className="ms-1"></FontAwesomeIcon>&nbsp;Home </Nav.Link>
	            	
	              	{
	              		(user.isAdmin)
	              			? //if admin is true
			              		<Nav.Link as={Link} to="/admin" active >AdminDashboard</Nav.Link>
			              	: //If not admin
			              		<Nav.Link as={Link} to="/products" eventKey="/products"><FontAwesomeIcon icon={faList} className="ms-1"></FontAwesomeIcon>&nbsp;AllProducts</Nav.Link>
	              	}

	                {	
	                (user.id !== null)
	                    ?	//true
	                       	<Nav.Link as={Link} to="/logout" eventKey="/logout">Logout</Nav.Link>
	                       	
	                    :   //false
	                		<>	
	                    		<Nav.Link as={Link} to="/login" eventKey="/login"><FontAwesomeIcon icon={faUser} className="ms-1"></FontAwesomeIcon>&nbsp;Login</Nav.Link>
	                        	<Nav.Link as={Link} to="/register" eventKey="/register"><FontAwesomeIcon icon={faAddressCard} className="ms-1"></FontAwesomeIcon>&nbsp;Register</Nav.Link>
	                        	<Nav.Link as={Link} to="/cartview" eventKey="/cartview"><FontAwesomeIcon icon={faCartShopping} className="ms-1"></FontAwesomeIcon> </Nav.Link>
	                	   	</>
	                }



	            </Nav>
	            </Navbar.Collapse>
	          </Container>
	        </Navbar>

	)
}

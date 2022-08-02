import {Navbar, Container} from "react-bootstrap";

export default function Footer(){

	return(
		<Navbar bg="dark" className="container-fluid p-3 text-center flex" variant="dark">
	          	<Navbar.Brand>
	            	<p>&copy; Copyright <strong>Arman Villegas</strong>. All Rights Reserved 2022</p>
	          	</Navbar.Brand>
		</Navbar>


	)
}
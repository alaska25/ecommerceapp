import {useContext, useEffect} from "react";
import UserContext from "../UserContext";
import {Navigate} from "react-router-dom";

export default function Logout(){
	// localStorage.clear();

	// Consume the UserContext objects and destructure it to access
	const {setUser, unsetUser} = useContext(UserContext);

	// Clear the localStorage of the user's information.
	unsetUser();
	// console.log(user);

	//To clear all user's information after logout.
	useEffect(()=>{
		// Set the user state back to its's original value.
		setUser({
			id: null,
			idAdmin: null
		})
	})

	return(
			<Navigate to="/login"/>
		)
}
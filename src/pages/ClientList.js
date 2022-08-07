import { useContext, useState, useEffect } from "react";
import {Table, Button} from "react-bootstrap";
import {Navigate, useNavigate, Link} from "react-router-dom";
import UserContext from "../UserContext";
import Swal from 'sweetalert2';

export default function ClientList(){
    // from local storage
    const list=localStorage.getItem('react-use-cart');
    // console.log(list)

    // to validate the user role.
    const {user} = useContext(UserContext);

    // Order State
    const [productCart, setProductCart] = useState([]);

    const orders = () => {
            fetch(`${process.env.REACT_APP_API_URL}/users/`,{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)

            setProductCart(data.map(cart => {
                            return(
                                    <tr key={cart.userId}>
                                        <td>{cart.firstName}</td>
                                        <td>{cart.lastName}</td>
                                        <td>{cart.email}</td>
                                        <td>{cart.mobileNo}</td>
                                        <td>{cart.createdOn}</td>
                                        <td>{cart.isAdmin ? "Admin" : "User"}</td>
                                        <td >
                                            {
                                                (cart.isAdmin)
                                                ?   

                                                    <Button variant="dark" size="sm" onClick ={() => changeToUser(cart._id, cart.firstName)}>Set as User</Button>
                    
                                                :
                                                    <Button variant="danger" size="sm" onClick ={() => change(cart._id, cart.firstName)}>Make Admin</Button>         
                                            }
                                        </td>
                                    </tr>
                                )
                            }))
                        })
            }

            // Make admin
            const change = (userId, userName) =>{
              console.log(userId);
              console.log(userName);

              fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/setAsAdmin`,{
                method: "PATCH",
                headers:{
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
              })
              .then(res => res.json())
              .then(data =>{
                console.log(data);

                if(data){
                  Swal.fire({
                    title: "Succesfully Change!",
                    icon: "success",
                    text: `This user is now an Admin.`
                  })

                  orders();  // For auto updating the status page // 

                }

                else{
                  Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: `Something went wrong. Please try again later!`
                  })
                }
              })
            }

            // change to user
            const changeToUser = (userId, userName) =>{
              console.log(userId);
              console.log(userName);

              fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/Unadmin`,{
                method: "PATCH",
                headers:{
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
              })
              .then(res => res.json())
              .then(data =>{
                console.log(data);

                if(data){
                  Swal.fire({
                    title: "Succesfully Change!",
                    icon: "success",
                    text: `You are now a regular user.`
                  })

                  orders();  // For auto reloading the page // 

                }

                else{
                  Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: `Something went wrong. Please try again later!`
                  })
                }
              })
            }

            useEffect(()=>{
                    // Get orders in the first render
                    orders();
                }, [])

        return(
                <>
                    <div className="mt-5 mb-3 text-center">
                        <h1 className="fw-bold">List of Admin / Users</h1>
                    </div>
                    <Table striped bordered hover  className="container">
                        <thead className="text-center fw-bold">
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Account Created</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            { productCart }
                        </tbody>
                    </Table>
                </>

            )
        }
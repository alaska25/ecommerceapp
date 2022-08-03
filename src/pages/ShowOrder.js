import { useContext, useState, useEffect } from "react";
import {Table, Button} from "react-bootstrap";
import {Navigate, useNavigate, Link} from "react-router-dom";
import UserContext from "../UserContext";
import Swal from 'sweetalert2';

export default function CheckOut(){
    // from local storage
    const list=localStorage.getItem('react-use-cart');
    // console.log(list)

    // to validate the user role.
    const {user} = useContext(UserContext);

    // Order State
    const [productCart, setProductCart] = useState([]);

    const orders = () => {
            fetch(`${process.env.REACT_APP_API_URL}/users/Orders`,{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)

            setProductCart(data.map(cart => {
                            return(
                                <tr key={cart._id}>
                                    <td className="readable">{cart._id}</td>
                                    <td className="readable">{cart.price}</td>
                                    <td className="readable">{cart.quantity}</td>
                                    <td className="readable">{cart.total}</td>
                                    <td><p className="text-center">Completed</p></td>
                                </tr>
                            )
                    }))
                })
            }

            /*function removeItem(cart){
                console.log(cart._id);

                    fetch(`${process.env.REACT_APP_API_URL}/products/removeCart`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                           productId: cart._id
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);

                        if(data){
                            Swal.fire({
                                title: "Product succesfully Added",
                                icon: "success",
                                text: `Item is now deleted`
                            });

                            // navigate("/admin");

                            orders();
                        }
                        else{
                            Swal.fire({
                                title: "Error!",
                                icon: "error",
                                text: `Something went wrong. Please try again later!`
                            });
                        }

                    })
            }*/


            useEffect(()=>{
                    // Get orders in the first render
                    orders();
                }, [])

        return(
        <>
            <div className="mt-5 mb-3 text-center">
                <h1 className="fw-bold text-success">Transaction History</h1>
            </div>
            <Table striped bordered hover variant="dark" className="container text-light">
             <thead className="text-center fw-bold">
               <tr>
                 <th>Product_Id_Number</th>
                 <th>Price</th>
                 <th>Quantity</th>
                 <th>Total</th>
                 <th>Status</th>
               </tr>
             </thead>
             <tbody className="text-center">
               { productCart }
             </tbody>
           </Table>
        </>

    );
}
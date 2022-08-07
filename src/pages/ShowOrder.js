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
                                <tr key={cart._id} className="text-center">
                                    <td>{cart.userId}</td>
                                    <td>{cart._id}</td>
                                    <td>{cart.productName}</td>
                                    <td>{cart.price}</td>
                                    <td>{cart.quantity}</td>
                                    <td>{cart.total}</td>
                                    <td>{cart.purchasedOn}</td>
                                    <td>{cart.status}</td>
                                </tr>
                            )
                    }))
                })
            }


            useEffect(()=>{
                    // Get orders in the first render
                    orders();
                }, [])

        return(
        <>
            <div className="mt-5 mb-3 text-center">
                <h1 className="fw-bold">Order History</h1>
            </div>
            <Table striped bordered hover  className="container">
             <thead className="text-center fw-bold">
               <tr>
                 <th>User_Id</th>
                 <th>Product_Id_Number</th>
                 <th>Product_Name</th>
                 <th>Price</th>
                 <th>Quantity</th>
                 <th>Total</th>
                 <th>Date</th>
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
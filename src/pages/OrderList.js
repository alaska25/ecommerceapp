import { useContext, useState, useEffect } from "react";
import {Table, Button} from "react-bootstrap";
import {Navigate, useNavigate, Link} from "react-router-dom";
import UserContext from "../UserContext";
import Swal from 'sweetalert2';

export default function OrderList(){
    // from local storage
    const list=localStorage.getItem('react-use-cart');
    // console.log(list)

    // to validate the user role.
    const {user} = useContext(UserContext);

    // Order State
    const [productCart, setProductCart] = useState([]);

    const orders = () => {
            fetch(`${process.env.REACT_APP_API_URL}/users/allOrders`,{
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
                                        <td className="readable">{cart.userId}</td>
                                        <td className="readable">{cart.productName}</td>
                                        <td className="readable">{cart.productId}</td>
                                        <td className="readable">{cart.price}</td>
                                        <td className="readable">{cart.quantity}</td>
                                        <td className="readable">{cart.total}</td>
                                        <td><p className="text-center">Completed</p></td>
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
                        <h1 className="fw-bold">Transaction History</h1>
                    </div>
                    <Table striped bordered hover  className="container">
                        <thead className="text-center fw-bold">
                            <tr>
                                <th>User_Id</th>
                                <th>Product_Name</th>
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
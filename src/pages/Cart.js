import { useState, useEffect, useContext } from "react";
import React from "react";
import { useCart } from "react-use-cart";
import {Navigate, useNavigate} from "react-router-dom";
import UserContext from "../UserContext";
import Swal from 'sweetalert2';

const Cart = () =>{

	 // to validate the user role.
 	 const {user} = useContext(UserContext);

	const navigate = useNavigate();

	const { isEmpty, totalUniqueItems, items, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();
	
	if(isEmpty) return <h1 className="text-center"></h1>

	const list = JSON.parse(localStorage.getItem('react-use-cart'));
    console.log(list.items)

    

	function checkout(productProp){


			const cartitem = list.items.map(item => {
			// console.log(list)


			fetch(`${process.env.REACT_APP_API_URL}/users/addOrder`,{
	            method: "POST",
	            headers:{
	                "Content-Type" : "application/json",
	                Authorization: `Bearer ${localStorage.getItem("token")}`
	            },
	            body: JSON.stringify({
	            	userId: item.userId,
					productId: item.id,
					productName: item.name,
					price: item.price,
					quantity: item.quantity
	            })
	        })
	        .then(res => res.json())
	        .then(data => {
	            console.log(data);

	            if(data === true){
	                Swal.fire({
	                    title: "Transaction Completed",
	                    icon: "success",
	                    text: "The item ordered will be delivered on time!"
	                })
	                navigate("/showorder");
	            }
	            
	            else{
	                Swal.fire({
	                    title: "We don't have enough stock!",
	                    icon: "error",
	                    text: "Please try again later."
	                })
	            }
	            
	        })
		})
	}

	return(
		<section className="py-4 container bg-light">
			<div className="row justify-content-center">
				<div className="col-12">
					<h5 className="fw-bold">Cart ({totalUniqueItems}) Total Items: ({totalItems})</h5>
					<table className="table table-light table-hover m-0">
					<tbody>
						{items.map((item, index)=>{
									return(
										<tr key={index}>
											<td>{item.userId}</td>
											<td>{item.name}</td>
											<td>{item.price}</td>
											<td>Quantity ({item.quantity})</td>
											<td>

											<button className="btn btn-primary text-danger ms-2 mt-2" onClick={()=> updateItemQuantity(item.id, item.quantity - 1)}>-</button>
											<button className="btn btn-primary text-warning ms-2 mt-2" onClick={()=> updateItemQuantity(item.id, item.quantity + 1)}>+</button>
											<button size="sm" className="btn btn-danger text-primary ms-2 fw-bold" onClick={()=>removeItem(item.id)}>Remove Item</button>
											</td>
										</tr>
									)
								})
						}

					</tbody>
					</table>
				</div>
				<div className="mt-4"></div>
				<hr/>
				<div className="col-auto ms-auto ">
					<h2 className="fw-bold mt-3">Total Price: &#8369;{cartTotal}</h2>
				</div>
				<div className="col-auto mt-2">
				{(user.id !== null)
				?
				<>
					<button className="btn btn-danger m-2 fw-bold" size="sm" onClick={()=> emptyCart()}>Clear Cart</button>
					<button className="btn btn-primary m-2 fw-bold" size="sm" onClick={() => checkout()}>Check Out</button>
				</>
				:
					<button className="btn btn-danger m-2 fw-bold" size="sm" onClick={()=> emptyCart()}>Clear Cart</button>
				}

				</div>
			</div>
		</section>
		)
}
export default Cart;

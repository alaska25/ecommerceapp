import { useState, useEffect, useContext } from "react";
import React from "react";
import { useCart } from "react-use-cart";

const Cart = () =>{
	const { isEmpty, totalUniqueItems, items, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();
	if(isEmpty) return <h1 className="text-center">Your Cart is Empty!</h1>



	return(
		<section className="py-4 container">
			<div className="row justify-content-center">
				<div className="col-12">
					<h5 className="fw-bold">Cart ({totalUniqueItems}) Total Items: ({totalItems})</h5>
					<table className="table table-light table-hover m-0">
					<tbody>
						{items.map((item, index)=>{
									return(
										<tr key={index}>
											<td>{item.name}</td>
											<td>{item.price}</td>
											<td>Quantity ({item.quantity})</td>

											<button className="btn btn-primary text-danger ms-2 mt-2" onClick={()=> updateItemQuantity(item.id, item.quantity - 1)}>-</button>
											<button className="btn btn-primary text-warning ms-2 mt-2" onClick={()=> updateItemQuantity(item.id, item.quantity + 1)}>+</button>
											<button size="sm" className="btn btn-danger text-primary ms-2 fw-bold" onClick={()=>removeItem(item.id)}>Remove Item</button>
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
					<button className="btn btn-danger m-2 fw-bold" size="sm"onClick={()=> emptyCart()}>Clear Cart</button>
					<button className="btn btn-primary m-2 fw-bold" size="sm">Buy Now</button>
				</div>
			</div>
		</section>
		)
}
export default Cart;

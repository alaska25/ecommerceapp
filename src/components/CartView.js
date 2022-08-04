// import {useEffect, useState, useContext} from "react";
// import ProductCard from "../components/ProductCard";
import {Container} from "react-bootstrap";
// import {Navigate} from "react-router-dom";
// import UserContext from "../UserContext";
import { CartProvider } from "react-use-cart";
import Cart from "../pages/Cart";
// import CartView from "../components/CartView"; 

export default function CartView(){

	// const [products, setProducts]= useState([]);

	// To be used for validating the "role" of the user.
	// const {user} = useContext(UserContext);

	//Retrieve the products from the database upon initial render of the product component.
	// useEffect(() =>{
	// 	fetch(`${process.env.REACT_APP_API_URL}/products`)
	// 	.then(res => res.json())
	// 	.then(data => {
	// 		// console.log(data);

	// 		setProducts(data.map((product, index) => {
	// 			// console.log(product)
				
	// 			return(
	// 				<ProductCard key={index} title={product.title} name={product.name} description={product.description} price={product.price} stocks={product.stocks} productProp={product} />
	// 				)
	// 		}))
	// 	})
	// },[])

	return(
			/*(user.isAdmin)
				? // it means admin is true
					<Navigate to="/admin"/>
				:*/
					<>
						<Container>	
							<CartProvider>

								<Cart />

							</CartProvider>

						</Container>	
					</>
		)
}
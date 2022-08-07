import {Container} from "react-bootstrap";
import { CartProvider } from "react-use-cart";
import Cart from "../pages/Cart";

export default function CartView(){

	return(
					<>
						<Container>	
							<CartProvider>

								<Cart />

							</CartProvider>

						</Container>	
					</>
		)
}
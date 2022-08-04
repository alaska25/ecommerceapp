import Banner from "../components/Banner";
import Highlights from "../components/Highlights";
import Content from "../components/Content";
import SubFooter from "../components/SubFooter";
import Footer from "../components/Footer";

import {Container} from "react-bootstrap"

export default function Home(){
	const data = {
		title: "Welcome to AV-Shop",
		content: "Buy now for affordable prices with high quality products.",
		destination: "/products",
		label: "Shop Now"
	}
	return(
			<>
				<div className="bg">
				<Banner data={data}/>
					<Container className="mt-5 pt-4">
						<Highlights />
						<br/><br/>
						
						<Content />
					</Container>

				<SubFooter />
				
				<Footer />
				</div>
			</>
		)
}
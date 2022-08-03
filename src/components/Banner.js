import {Row, Col, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

export default function Banner({data}){
	console.log(data);

	// Destructuring refer to errorjs
	const {title, content, destination, label} = data;

	return(
			<div className="container-fluid">
				<Row className="bg-image text-light">
					<Carousel>
					      <Carousel.Item>
					       <Col className="p-5 text-center">
					       				<h1 className="text-success fw-bold">{title}</h1>
					       				<p>{content}</p>
					       				<Button as={Link} to={destination} variant="primary">{label}</Button>
					       </Col>
					 
					      </Carousel.Item>
					      <Carousel.Item>
					        <Col className="p-5 text-center">
			    				<h1 className="text-warning  fw-bold">Shopping Place For Everyone!</h1>
			    				<p>Check out out most favourited & best selling product for this month...</p>
			    				<Button as={Link} to={destination} variant="primary">All Products</Button>
					        </Col>

					      </Carousel.Item>
					      <Carousel.Item>
					        <Col className="p-5 text-center">
			    				<h1 className="text-danger fw-bold">New Arrivals!</h1>
			    				<p>Come and hurry before stocks run out.</p>
			    				<Button as={Link} to={destination} variant="primary">Start Shopping Now</Button>
					        </Col>
					      </Carousel.Item>
					</Carousel>
				</Row>
			</div>
	)
}
import {Row, Col, Card} from "react-bootstrap";
export default function Highlights(){
	return(
			<Row className="mt-3 mb-3">
			            <Col xs={12} md={4}>
			                <Card className="cardHighlight p-3 hover">
			                    <Card.Body>
			                        <Card.Title>
			                            <h2 className="fw-bold text-center">HUAWEI<br/></h2>
			                        </Card.Title>
			                        <hr/>
			                        <Card.Text className="fw-bold d-flex text-center">
			                           <p>Founded in 1987, Huawei is a leading global provider of information and communications technology (ICT) infrastructure and smart devices. We have approximately 195,000 employees and we operate in over 170 countries and regions, serving more than three billion people around the world.
			                           </p>
			                        </Card.Text>
			                    </Card.Body>
			                </Card>
			            </Col>
			            <Col xs={12} md={4}>
			                <Card className="cardHighlight p-3">
			                    <Card.Body>
			                        <Card.Title>
			                            <h2 className="fw-bold text-center">SAMSUNG<br/></h2>
			                        </Card.Title>
			                        <hr/>
			                        <Card.Text className="fw-bold d-flex text-center">
			                            <p>Samsung, South Korean company that is one of the world's largest producers of electronic devices. Samsung specializes in the production of a wide variety of consumer and industry electronics, including appliances, digital media devices, semiconductors, memory chips, and integrated systems.
			                            </p>
			                        </Card.Text>
			                    </Card.Body>
			                </Card>
			            </Col>
			            <Col xs={12} md={4}>
			                <Card className="cardHighlight p-3">
			                    <Card.Body>
			                        <Card.Title>
			                            <h2 className="fw-bold text-center">DELL<br/></h2>
			                        </Card.Title>
			                        <hr/>
			                        <Card.Text className="fw-bold d-flex text-center">
			                           <p>Dell Inc., formerly PC's Limited (1984–88) and Dell Computer Corporation (1988–2003), global company that designs, develops, and manufactures personal computers (PCs) and a variety of computer-related products. The company is one of the world's leading suppliers of PCs. Dell is headquartered in Round Rock, Texas.
			                           </p>
			                        </Card.Text>
			                    </Card.Body>
			                </Card>
			            </Col>
			        </Row>
		)
}
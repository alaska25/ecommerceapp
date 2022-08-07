import { Table } from "react-bootstrap";

export default function SubFooter(){
	return(

	    	<div bg="dark" className="container-fluid">
	    		<Table striped bordered hover variant="dark" className="container">
	    		      <thead>
	    		        <tr>
	    		          <th>#</th>
	    		          <th>First Name</th>
	    		          <th>Last Name</th>
	    		          <th>Username</th>
	    		        </tr>
	    		      </thead>
	    		      <tbody>
	    		        <tr>
	    		          
	    		          <td>Mark</td>
	    		          <td>Otto</td>
	    		          <td>@mdo</td>
	    		        </tr>
	    		        <tr>
	    		          <td>2</td>
	    		          <td>Jacob</td>
	    		          <td>Thornton</td>
	    		          <td>@fat</td>
	    		        </tr>
	    		        <tr>
	    		          <td>3</td>
	    		          <td colSpan={2}>Larry the Bird</td>
	    		          <td>@twitter</td>
	    		        </tr>
	    		      </tbody>
	    		    </Table>

	    	</div>
		)
}
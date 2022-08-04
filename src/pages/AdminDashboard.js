import { useContext, useState, useEffect } from "react";
import {Table, Button, Container } from "react-bootstrap";
import {Navigate, Link} from "react-router-dom";
import UserContext from "../UserContext";

import Swal from "sweetalert2";

export default function AdminDashboard(){

  // to validate the user role.
  const {user} = useContext(UserContext);

  //Create allCourses State to contain the courses from the database.
  const [allProducts, setAllProducts] = useState([]);

  //"fetchData()" wherein we can invoke if their is a certain change with the course.
  const fetchData = () =>{
    fetch(`${process.env.REACT_APP_API_URL}/products/all`,{
      headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      setAllProducts(data.map(product => {
        return(
          <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.stocks}</td>
            <td>{product.isActive ? "Active" : "Inactive"}</td>
            <td>
              {
                (product.isActive)
                ?
                  <Button variant="danger" size="sm" onClick ={() => archive(product._id, product.name)}>Archive</Button>
                :
                  <>
                    <Button variant="success" size="sm" onClick ={() => unarchive(product._id, product.name)}>Unarchive</Button>
                    <Button as={ Link } to={`/editProduct/${product._id}`} variant="secondary" size="sm" className="m-2" >Edit</Button>
                  </>
              }
            </td>
          </tr>
        )
      }))

    })
  }

  //Making the product inactive
  const archive = (productId, productName) =>{
    console.log(productId);
    console.log(productName);

    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        isActive: false
      })
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data);

      if(data){
        Swal.fire({
          title: "Archive Succesful!",
          icon: "success",
          text: `${productName} is now inactive.`
        })
        fetchData();
      }
      else{
        Swal.fire({
          title: "Archive Unsuccessful!",
          icon: "error",
          text: `Something went wrong. Please try again later!`
        })
      }
    })
  }

  //Making the product active
  const unarchive = (productId, productName) =>{
    console.log(productId);
    console.log(productName);

    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        isActive: true
      })
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data);

      if(data){
        Swal.fire({
          title: "Unarchive Succesful!",
          icon: "success",
          text: `${productName} is now active.`
        })
        fetchData();
      }
      else{
        Swal.fire({
          title: "Unarchive Unsuccessful!",
          icon: "error",
          text: `Something went wrong. Please try again later!`
        })
      }
    })
  }

  // To fetch all products in the first render of the page.
  useEffect(()=>{
    // invoke fetchData() to get all products.
    fetchData();
  }, [])



  return(
    (user.isAdmin)
    ?
      <>
          <Container className="mt-1 pt-4 responsive">
            <div className="mt-5 mb-3 text-center">
              <h1 className="text-center fw-bold text-capitalize">Admin Dashboard</h1><br/>
              <Button as={Link} to="/addProduct" eventKey="/addProduct" variant="primary" size="md" className="mx-2"> Add Product </Button>
              <Button as={Link} to="/orderlist" eventKey="/orderlist" variant="primary" size="md" className="mx-2">Order List</Button>
            </div><br/>
            <Table striped bordered hover responsive>
               <thead>
                 <tr className="text-center">
                   <th>Product&nbsp;ID</th>
                   <th>Product&nbsp;Name</th>
                   <th>Description</th>
                   <th>Price</th>
                   <th>Stocks</th>
                   <th>Status</th>
                   <th>Action</th>
                 </tr>
               </thead>
               <tbody>
                 { allProducts }
               </tbody>
             </Table>
          </Container>
      </>
    :
      <Navigate to="/products" />
  )
}
import {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {UserProvider} from "./UserContext";
import AppNavbar from "./components/AppNavbar";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct"
import Products from "./pages/Products";
import ProductView from "./pages/ProductView";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddOrder from "./pages/AddOrder";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import {Container} from "react-bootstrap";
import './App.css';
import Cart from "./pages/Cart";
import { CartProvider } from "react-use-cart";
import CartView from "./components/CartView";
import ShowOrder from "./pages/ShowOrder";

function App() {
// to store the user information and will be used for validating if a user is already logged in on the app or not.
  const [user, setUser] = useState({
    // email: localStorage.getItem("email")
    id: null,
    isAdmin: null
  })

  // We can check the changes in our User State.
  console.log(user);
  
//Function for clearing local storage on logout.
  const unsetUser = () =>{
    localStorage.clear();
  }

  useEffect(()=>{
    console.log(user);
    console.log(localStorage);

    //user act as dependency
  }, [user])

  // To update the User State upon page load if a user already exist.
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/users/details`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data)

      // Set the user states values with the user details upon successful login.
      if(typeof data._id !== "undefined"){

         //This will be set to the user state.
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        })
      }
      else{
        // set back to the initial state of the user.
        // Undefined
        setUser({
          id: null,
          isAdmin: null
        })
      }
     
    })
  }, [])

  return (
  <>
    <UserProvider value={{user, setUser, unsetUser}}>
        <Router>
          <AppNavbar />
              <Routes>
                  <Route exact path ="/" element={<Home />} />
                  <Route exact path ="/admin" element={<AdminDashboard />} />
                  <Route exact path ="/addproduct" element={<AddProduct />} />
                  <Route exact path ="/addorder" element={<AddOrder />} />
                  <Route exact path ="/cartview" element={<CartView />} />
                  <Route exact path="/editProduct/:productId" element={<EditProduct />}/>
                  <Route exact path ="/products" element={<Products />} />
                  <Route exact path ="/products/:productId" element={<ProductView />} />
                  <Route exact path ="/register" element={<Register />} />
                  <Route exact path ="/showorder" element={<ShowOrder />} />
                  <Route exact path ="/login" element={<Login />} />
                  <Route exact path ="/logout" element={<Logout />} />
                  <Route exact path ="*" element={<Error />} />

              </Routes>
        </Router>
    </UserProvider>
  </> 
  );
}

export default App;


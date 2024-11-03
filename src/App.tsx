import { Route , Routes } from "react-router-dom";
import Login from "./Pages/Login/LoginPage";
import Register from "./Pages/Register/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import Shop from "./Pages/ProductsBuyer/Shop";
import ShoppingCart from "./Pages/ProductsBuyer/ShoppingCart";
import NotFound from "./Pages/404/NotFound";
import CompletaPerfil from "./Pages/Profile/CompletaPerfil";
import SellerProfile from "./Pages/Profile/Profile";
import CrudProduct from "./Pages/ProductsSeller/NewProduct";
import EditProduct from "./Pages/ProductsSeller/EditProduct";
import ProductDetails from "./Pages/ProductsBuyer/ProductDetail";
import ProductSeller from "./Pages/ProductsSeller/MyProducts";
import Us from "./Pages/AboutUs/Us";


function App() {
  return (
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/profile" element={<SellerProfile/>}/>
    <Route path="/homepage" element={<HomePage/>}/>
    <Route path="/completa-perfil" element={<CompletaPerfil/>}/>
    <Route path="/shop" element={<Shop/>}/>
    <Route path="/shopping-cart" element={<ShoppingCart/>}/>
    <Route path="/create-product" element={<CrudProduct/>}/>
    <Route path="/edit-product/:id" element={<EditProduct/>}/>
    <Route path="/product-details/:id" element={<ProductDetails/>}/>
    <Route path="/my-products" element={<ProductSeller/>}/> 
    <Route path="/aboutus" element={<Us/>}/>
    <Route path="*" element={<NotFound/>}/>
   </Routes>
  )
}

export default App

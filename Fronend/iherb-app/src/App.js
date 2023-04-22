import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProductsHome from "./components/ProductsHome";

import ProductDetails from "./components/ProductDetails";
import OrderDetails from "./components/OrderDetails";
import AdminProductsHome from "./components/AdminProductsHome";
import CreateProduct from "./components/CreateProduct";
import AdminHome from "./components/AdminHome";
import Checkout from "./components/Payment";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<ProductsHome />} />
          <Route path="/product/:id" exact element={<ProductDetails />} />
          <Route path="/cart/:userId" exact element={<OrderDetails />} />
          <Route path="admin/Home/" exact element={<AdminHome />} />
          <Route path="admin/Products/" exact element={<AdminProductsHome />} />
          <Route
            path="admin/editProduct/:id"
            exact
            element={<UpdateProduct />}
          />
          <Route path="admin/newProduct" exact element={<CreateProduct />} />
          <Route path="/checkout" exact element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

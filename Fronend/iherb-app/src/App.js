import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProductsHome from "./components/ProductsHome";

import ProductDetails from "./components/ProductDetails";
import OrderDetails from "./components/OrderDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
           <Route path="/" exact element={<ProductsHome />} />
          <Route path="/product/:id" exact element={<ProductDetails />} />
          <Route path="/cart/:userId" exact element={<OrderDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProductsHome from "./components/ProductsHome";

import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
           <Route path="/" exact element={<ProductsHome />} />
          <Route path="/product/:id" exact element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

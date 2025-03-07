import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductDetails from "./components/ProductDetails";
import CompareProducts from "./components/CompareProducts";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-layout">
          <Sidebar />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<ProductDetails />} />
              <Route path="/compare" element={<CompareProducts />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

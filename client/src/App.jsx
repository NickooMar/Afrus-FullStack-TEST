import React from "react";

import { Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import SearchProducts from "./pages/Products/SearchProducts";
import AddProduct from "./pages/Products/AddProduct";
import AddCostumer from "./pages/Costumers/AddCostumer";
import SearchCostumer from "./pages/Costumers/SearchCostumers";
import AddTransaction from "./pages/Transactions/AddTransaction";
import Transactions from "./pages/Transactions/Transactions";
import Missing from "./pages/Missing";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {/* Products */}
        <Route path="/products" element={<SearchProducts />} />
        <Route path="/products/new" element={<AddProduct />} />

        {/* Costumers */}
        <Route path="/costumers" element={<SearchCostumer />} />
        <Route path="/costumers/new" element={<AddCostumer />} />

        {/* Costumers */}
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/new" element={<AddTransaction />} />

        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
};

export default App;

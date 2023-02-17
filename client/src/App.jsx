import React from "react";

import { Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import SearchProducts from "./pages/Products/SearchProducts";
import AddProduct from "./pages/Products/AddProduct";
import AddCostumer from "./pages/Costumers/AddCostumer";
import SearchCostumer from "./pages/Costumers/SearchCostumers";
import CostumersList from "./pages/Costumers/CostumersList";
import AddTransaction from "./pages/Transactions/AddTransaction";
import SearchTransactions from "./pages/Transactions/SearchTransactions";
import SearchEvent from "./pages/Events/SearchEvent";
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
        <Route path="/costumers/list" element={<CostumersList />} />
        <Route path="/costumers/new" element={<AddCostumer />} />

        {/* Costumers */}
        <Route path="/transactions" element={<SearchTransactions />} />
        <Route path="/transactions/new" element={<AddTransaction />} />

        {/* Events */}
        <Route path="/events" element={<SearchEvent />} />

        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
};

export default App;

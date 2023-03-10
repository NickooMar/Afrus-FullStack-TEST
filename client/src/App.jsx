import React from "react";

import { Routes, Route } from "react-router-dom";
// import HomeScreen from "./pages/HomeScreen";
// import SearchProducts from "./pages/Products/SearchProducts";
// import AddProduct from "./pages/Products/AddProduct";
// import ProductList from "./pages/Products/ProductList";
// import AddCostumer from "./pages/Costumers/AddCostumer";
// import SearchCostumer from "./pages/Costumers/SearchCostumers";
// import CostumersList from "./pages/Costumers/CostumersList";
// import AddTransaction from "./pages/Transactions/AddTransaction";
// import SearchTransactions from "./pages/Transactions/SearchTransactions";
// import SearchEvent from "./pages/Events/SearchEvent";
// import Missing from "./pages/Missing";

import {
  AddCostumer,
  CostumersList,
  SearchCostumers,
  SearchEvent,
  HomeScreen,
  Missing,
  AddProduct,
  ProductList,
  SearchProducts,
  AddTransaction,
  SearchTransactions,
} from "./pages";

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
        <Route path="/products/list" element={<ProductList />} />

        {/* Costumers */}
        <Route path="/costumers" element={<SearchCostumers />} />
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

import React, { Component } from "react";
import { BrowserRouter , Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./Pages/Login/LoginForm";
import ProductAdd from './Pages/ProductAdd/ProductAdd';
import ProductSearch from "./Pages/ProductsSearch/ProductSearch";
import Checkout from "./Pages/Checkout/Checkout"
import AdminPage from "./Pages/AdminPage";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedProducts: [],
      isAuthenticated: false,
      isAdmin: false
    }
  }

  handleUpdate = (products) => {
    this.setState({ selectedProducts: products });
    console.log(this.state.selectedProducts);
  }

  handleLogout = () => {
    this.setState({ isAuthenticated: false, isAdmin: false });
  }

  handleAuthentication = (info) => {
    if (!info || !info.role) {
      alert(info)
    } else {this.setState({ isAuthenticated: info!== null , isAdmin: info.role === 'Admin' });}
  }

  render() {
    const {isAuthenticated, isAdmin, selectedProducts} = this.state;
  return (
    <div className="App">
      <header>
        <BrowserRouter >
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path={"/login"} element={<LoginForm handleAuthentication={this.handleAuthentication}/>} />
          <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminPage handleLogout={this.handleLogout}/>: <Navigate to="/login" replace={true} />} />
          <Route path="/products/add" element={isAuthenticated  && isAdmin ? <ProductAdd handleLogout={this.handleLogout} />: <Navigate to="/login" replace={true} />} />
          <Route path="/products/search" element={isAuthenticated ? <ProductSearch handleLogout={this.handleLogout} handleUpdate={this.handleUpdate}/>: <Navigate to="/login" replace={true} />} />
          <Route path="/products/checkout" element={isAuthenticated ? <Checkout handleLogout={this.handleLogout} productsList={selectedProducts} />: <Navigate to="/login" replace={true} />} />
        </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
  }
}

export default App;

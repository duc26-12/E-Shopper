import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import GlobalStyles from "../src/component/GlobalStyles/GlobalStyles";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "../src/component/Blog/Blog/Blog";
import Details from "../src/component/Blog/Details/Details";
import Register from "../src/component/Member/Register";
import Login from "../src/component/Member/Login";
import Update from "../src/component/Account/Update";
import Product from "../src/component/Account/Product";
import AddProduct from "../src/component/Account/AddProduct";
import EditProduct from "../src/component/Account/EditProduct";
import ProductHome from "../src/component/Product/ProductHome";
import ProductDetail from "../src/component/Product/Detail";
import Cart from "../src/component/Product/Cart";
import Wishlist from "./component/Product/Wishlist";

import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <GlobalStyles>
          <App>
            <Routes>
              <Route path="/" element={<ProductHome />} />
              <Route path="/product/detail/:id" element={<ProductDetail />} />
              <Route path="/product/cart" element={<Cart />} />
              <Route path="/product/wishlist" element={<Wishlist />} />
              <Route path="/blog/list" element={<Blog />} />
              <Route path="/blog/detail/:id" element={<Details />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account/update" element={<Update />} />
              <Route path="/account/product/list" element={<Product />} />
              <Route path="/account/product/add" element={<AddProduct />} />
              <Route
                path="/account/product/edit/:id"
                element={<EditProduct />}
              />
            </Routes>
          </App>
        </GlobalStyles>
      </Router>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

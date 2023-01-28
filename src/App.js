import Header from "../src/component/Layout/Header/Header";
import Footer from "../src/component/Layout/Footer/Footer";
import MenuLeft from "../src/component/Layout/MenuLeft/MenuLeft";
import MenuAcc from "../src/component/Layout/MenuAcc/MenuAcc";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";

function App(props) {
  let params1 = useLocation();

  return (
    <div className="App">
      <Header />
      <section className="container">
        <div className="row">
          {params1["pathname"].includes("account") ? <MenuAcc /> : <MenuLeft />}
          {props.children}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;

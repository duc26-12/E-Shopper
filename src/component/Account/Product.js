import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import "./Product.scss";

const Product = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("token"));
    const accessToken = tokenData.token;
    const url = "http://localhost/laravel/laravel/public/api/user/my-product";
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios.get(url, config).then((res) => {
      setData(res.data.data);
    });
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const tokenData = JSON.parse(localStorage.getItem("token"));
    const accessToken = tokenData.token;
    const url =
      "http://localhost/laravel/laravel/public/api/user/delete-product/";
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios.get(url + id, config).then((res) => {
      setData(res.data);
    });
  };

  const renderProduct = () => {
    if (Object.keys(data).length > 0) {
      return Object.keys(data).map((key, index) => {
        const image = JSON.parse(data[key]["image"]);
        return (
          <tr key={index}>
            <td>{data[key]["id"]}</td>
            <td>{data[key]["name"]}</td>
            <td>
              <a href="/">
                <img
                  className="image_user"
                  src={
                    "http://localhost/laravel/laravel/public/upload/user/product/" +
                    data[key]["id_user"] +
                    "/" +
                    image[0]
                  }
                  alt=""
                />
              </a>
            </td>
            <td>${data[key]["price"]}</td>
            <td>
              <div className="actions">
                <div>
                  <Link to={"/account/product/edit/" + data[key]["id"]}>
                    <AiOutlineForm />
                  </Link>
                </div>
                <div>
                  <MdOutlineClose id={data[key]["id"]} onClick={handleDelete} />
                </div>
              </div>
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <div className="col-sm-9">
      <div className="cart_info">
        <table className="table">
          <thead className="table_head">
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Image</td>
              <td>Price</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>{renderProduct()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;

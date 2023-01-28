import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai";

const Cart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("data"));

    axios
      .post("http://localhost/laravel/laravel/public/api/product/cart", item)
      .then((res) => {
        setData(res.data.data);
      });
  }, []);

  const handlePlus = (e) => {
    let dataUser = {};
    const id = e.target.id;

    const newData = [...data];

    newData.map((value, index) => {
      if (id == value.id) {
        newData[index]["qty"] += 1;
      }
    });
    setData(newData);

    let getLocal = localStorage.getItem("data");
    if (getLocal) {
      dataUser = JSON.parse(getLocal);

      if (dataUser[id]) {
        dataUser[id] = dataUser[id] + 1;
      }
    }
    localStorage.setItem("data", JSON.stringify(dataUser));
  };
  const handleMinus = (e) => {
    let dataUser = {};
    const id = e.target.id;
    const newData = [...data];
    newData.map((value, index) => {
      if (id == value.id) {
        newData[index]["qty"] -= 1;
      }
    });
    setData(newData);

    let getLocal = localStorage.getItem("data");
    if (getLocal) {
      dataUser = JSON.parse(getLocal);

      if (dataUser[id]) {
        dataUser[id] = dataUser[id] - 1;
      }
    }
    localStorage.setItem("data", JSON.stringify(dataUser));
  };

  const handleRemove = (e) => {
    let id = e.target.id;
    const newArray = [...data];
    newArray.map((value, index) => {
      if (id == value.id) {
        newArray.splice(index, 1);
      }
    });
    setData(newArray);

    let dataUser = {};
    let getLocal = localStorage.getItem("data");
    if (getLocal) {
      dataUser = JSON.parse(getLocal);

      if (dataUser[id]) {
        delete dataUser[id];
      }
    }
    localStorage.setItem("data", JSON.stringify(dataUser));
  };

  const renderCart = () => {
    if (Object.keys(data).length > 0) {
      return data.map((value, index) => {
        const total = value.price * value.qty;
        const image = JSON.parse(value.image);

        return (
          <tr key={index}>
            <td>
              <img
                src={
                  "http://localhost/laravel/laravel/public/upload/user/product/" +
                  value.id_user +
                  "/" +
                  image[0]
                }
                alt=""
                className="image_cart"
              />
            </td>
            <td>
              <div>
                <h3>{value.name}</h3>
                <p>Web id:{value.web_id}</p>
              </div>
            </td>
            <td>
              <div className="wrap_price">${value.price}</div>
            </td>
            <td>
              <div className="wrap_qty icon_wrapper">
                <div className="icon" id={value.id} onClick={handleMinus}>
                  <AiOutlineMinus className="icon_cart" id={value.id} />
                </div>
                <div className="qty">{value.qty}</div>
                <div className="icon" id={value.id} onClick={handlePlus}>
                  <AiOutlinePlus className="icon_cart" id={value.id} />
                </div>
              </div>
            </td>
            <td>
              <div className="wrap_total">
                <p>${total}</p>
              </div>
            </td>
            <td>
              <span className="icon_remove" onClick={handleRemove}>
                <AiOutlineClose id={value.id} />
              </span>
            </td>
          </tr>
        );
      });
    }
  };

  const renderTotal = () => {
    if (data.length > 0) {
      const totalPrice = data.reduce((acc, cur) => {
        return acc + cur.price * cur.qty;
      }, 0);
      const total = totalPrice + 21;
      return (
        <div className="total_area">
          <ul>
            <li>
              Cart Sub Total <span>${totalPrice}</span>
            </li>
            <li>
              Eco Tax <span>$21</span>
            </li>
            <li>
              Shipping Cost <span>Free</span>
            </li>
            <li>
              Total <span>${total}</span>
            </li>
          </ul>
          <a className="btn btn-default update" href="">
            Update
          </a>
          <a className="btn btn-default check_out" href="">
            Check Out
          </a>
        </div>
      );
    }
  };

  return (
    <div className="col-sm-9">
      <div className="cart_info">
        <table className="table">
          <thead className="table_head">
            <tr>
              <td className="child1">Image</td>
              <td className="child2"></td>
              <td className="child3">Price</td>
              <td className="child4">Quantity</td>
              <td className="child5">Total</td>
              <td className="child6"></td>
            </tr>
          </thead>
          <tbody>{renderCart()}</tbody>
        </table>
      </div>
      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">{renderTotal()}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;

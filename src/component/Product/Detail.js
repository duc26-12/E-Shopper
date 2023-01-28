import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// import ModalImage from "./ModalImage";
import "./Product.scss";
import ModalImage from "./ModalImage";

const Detail = () => {
  const params = useParams();
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState({});

  const [showImage, setShowImage] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://localhost/laravel/laravel/public/api/product/detail/" +
          params.id
      )
      .then((res) => {
        setData(res);
        const newImage = JSON.parse(res.data.data.image);
        setShowImage(newImage[0]);
      });
  }, []);

  const handleChangeImage = (value) => {
    setShowImage(value);
  };

  const handleShowModal = () => {
    setToggle(!toggle);
  };

  const renderDetail = () => {
    if (Object.keys(data).length > 0) {
      const detail = data.data.data;
      const image = JSON.parse(detail.image);
      return (
        <div className="col-sm-5">
          <div className="view-product">
            <img
              src={
                "http://localhost/laravel/laravel/public/upload/user/product/" +
                detail.id_user +
                "/" +
                showImage
              }
              alt=""
            />
            <div onClick={handleShowModal}>
              <h3>ZOOM</h3>
            </div>
          </div>
          <div
            id="similar-product"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="item active">
                {image.map((value, index) => {
                  return (
                    <div href="#" key={index} className="slide_child">
                      <img
                        src={
                          "http://localhost/laravel/laravel/public/upload/user/product/" +
                          detail.id_user +
                          "/" +
                          value
                        }
                        alt=""
                        className="slide_image"
                        onClick={() => handleChangeImage(value)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <a
              className="left item-control"
              href="#similar-product"
              data-slide="prev"
            >
              <i className="fa fa-angle-left"></i>
            </a>
            <a
              className="right item-control"
              href="#similar-product"
              data-slide="next"
            >
              <i className="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      );
    }
  };
  const renderInfo = () => {
    if (Object.keys(data).length > 0) {
      const Info = data.data.data;
      return (
        <div className="col-sm-7">
          <div className="product-information">
            <img
              src="images/product-details/new.jpg"
              className="newarrival"
              alt=""
            />
            <h2>Anne Klein Sleeveless Colorblock Scuba</h2>
            <p>Web ID: 1089772</p>
            <img src="images/product-details/rating.png" alt="" />
            <span>
              <span>US ${Info.price}</span>
              <label>Quantity:</label>
              <input type="text" defaultValue="3" />
              <button type="button" className="btn btn-fefault cart">
                <i className="fa fa-shopping-cart"></i>
                Add to cart
              </button>
            </span>
            <p>
              <b>Availability:</b> In Stock
            </p>
            <p>
              <b>Condition:</b> {Info.status}
            </p>
            <p>
              <b>Brand:</b> {Info.brand}
            </p>
            <a href="/">
              <img
                src="images/product-details/share.png"
                className="share img-responsive"
                alt=""
              />
            </a>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="col-sm-9 padding-right">
      {renderDetail()}
      {renderInfo()}

      <ModalImage
        image={showImage}
        data={data}
        toggle={setToggle}
        Trigger={toggle}
      />
    </div>
  );
};

export default Detail;

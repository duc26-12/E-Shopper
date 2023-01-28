import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  // State -------------------------------------------
  const [brand, setBrand] = useState({});
  const [getValueInput, setGetValueInput] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    status: "",
    sale: "",
    company: "",
    detail: "",
  });
  const [getFile, setGetFile] = useState([]);
  const [error, setError] = useState({});

  // Effect ----------------------------------
  useEffect(() => {
    axios
      .get("http://localhost/laravel/laravel/public/api/category-brand")
      .then((res) => {
        setBrand(res);
      });
  }, []);

  // handle form-------------------------------------
  const handleFileImage = (e) => {
    const file = e.target.files;
    setGetFile(file);
  };
  const handleValues = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setGetValueInput((state) => ({ ...state, [nameInput]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;

    if (getValueInput.name === "") {
      errorSubmit.name = "Please enter your name";
      flag = false;
    }
    if (getValueInput.price === "") {
      errorSubmit.price = "Please enter the price";
      flag = false;
    }
    if (getValueInput.category === "") {
      errorSubmit.category = "Please select a category";
      flag = false;
    }
    if (getValueInput.brand === "") {
      errorSubmit.brand = "Please choose a brand";
      flag = false;
    }
    if (getValueInput.company === "") {
      errorSubmit.company = "Please do not leave it blank";
      flag = false;
    }
    if (getFile === "") {
      errorSubmit.getFile = "Please do not leave it blank";
      flag = false;
    } else {
      Object.keys(getFile).map((key, index) => {
        if (getFile[key]["size"] > 1024 * 1024) {
          errorSubmit.getFile =
            "Please choose a photo with a smaller resolution";
          flag = false;
        } else {
          const photoTail = ["png", "jpg", "jpeg", "PNG", "JPG"];
          const photo = photoTail.map((photo) => {
            return photo;
          });
          const fileType = getFile[key]["name"].split(".")[1];
          const type = ["jpg", "png", "jpeg", "PNG", "JPG"];
          if (!type.includes(fileType)) {
            errorSubmit.getFile = `Please choose an image ending in: ${photo}`;
            flag = false;
          }
        }
        return getFile;
      });
    }

    if (getValueInput.detail === "") {
      errorSubmit.detail = "Please write something";
      flag = false;
    }
    if (!flag) {
      setError(errorSubmit);
    } else {
      const url =
        "http://localhost/laravel/laravel/public/api/user/add-product";
      const localToken = JSON.parse(localStorage.getItem("token"));
      let accessToken = localToken.token;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      const local = localStorage.getItem("login");
      if (local) {
        const formData = new FormData();
        formData.append("name", getValueInput.name);
        formData.append("price", getValueInput.price);
        formData.append("category", getValueInput.category);
        formData.append("brand", getValueInput.brand);
        formData.append("company", getValueInput.company);
        formData.append("detail", getValueInput.detail);
        formData.append("status", getValueInput.status);
        formData.append("sale", getValueInput.sale);
        Object.keys(getFile).map((key) => {
          formData.append("file[]", getFile[key]);
          return getFile[key];
        });
        axios.post(url, formData, config).then((res) => {
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            alert("thành công");
          }
        });
      }
    }
  };
  // render-----------------------------------------------
  const renderCategory = () => {
    if (Object.keys(brand).length > 0) {
      const options = brand.data.category;
      return options.map((value) => {
        return (
          <option value={value.id} key={value.id}>
            {value.category}
          </option>
        );
      });
    }
  };
  const renderBrand = () => {
    if (Object.keys(brand).length > 0) {
      const options = brand.data.brand;
      return options.map((value) => {
        return (
          <option value={value.id} key={value.id}>
            {value.brand}
          </option>
        );
      });
    }
  };
  const renderSale = () => {
    if (getValueInput.status === "0") {
      return (
        <input
          className="input_sale"
          type="text"
          value={getValueInput.sale}
          name="sale"
          onChange={handleValues}
        />
      );
    }
  };

  return (
    <div className="col-sm-9">
      <div className="form_wrapper-add-product">
        <div className="Add_title">
          <h2>Create Product</h2>
        </div>
        <form encType="multipart/form-data">
          <div className="input_field">
            <input
              className="inp inp_select"
              type="text"
              placeholder="Name"
              name="name"
              value={getValueInput.name}
              onChange={handleValues}
            />
            <div className="msg-error">{error.name ? error.name : null}</div>
          </div>
          <div className="input_field">
            <input
              className="inp inp_select"
              type="text"
              placeholder="Price"
              name="price"
              value={getValueInput.price}
              onChange={handleValues}
            />
            <div className="msg-error">{error.price ? error.price : null}</div>
          </div>
          <div className="input_field">
            <select
              className="inp inp_select"
              name="category"
              value={getValueInput.category}
              onChange={handleValues}
            >
              <option value="0">Please choose category</option>
              {renderCategory()}
            </select>
            <div className="msg-error">
              {error.category ? error.category : null}
            </div>
          </div>
          <div className="input_field">
            <select
              className="inp inp_select"
              name="brand"
              value={getValueInput.brand}
              onChange={handleValues}
            >
              <option value="0">Please choose brand</option>
              {renderBrand()}
            </select>
            <div className="msg-error">{error.brand ? error.brand : null}</div>
          </div>
          <div className="input_field">
            <select
              className="inp inp_select"
              name="status"
              value={getValueInput.status}
              onChange={handleValues}
            >
              <option value="1">New</option>
              <option value="0">Sale</option>
            </select>
          </div>
          {renderSale()}
          <span className="percent">%</span>
          <div className="input_field">
            <input
              className="inp inp_select"
              type="text"
              placeholder="Company profile"
              name="company"
              value={getValueInput.company}
              onChange={handleValues}
            />
            <div className="msg-error">
              {error.company ? error.company : null}
            </div>
          </div>
          <div className="input_field">
            <input
              className="inp input_avatar"
              type="file"
              name="avatar"
              onChange={handleFileImage}
              multiple
            />
            <div className="msg-error">
              {error.getFile ? error.getFile : null}
            </div>
          </div>
          <div className="input_field">
            <textarea
              className="inp inp_select"
              type="text"
              placeholder="Detail"
              name="detail"
              value={getValueInput.detail}
              onChange={handleValues}
            />
            <div className="msg-error">
              {error.detail ? error.detail : null}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary  "
            onClick={handleSubmit}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

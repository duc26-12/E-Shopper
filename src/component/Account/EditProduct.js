import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [brand, setBrand] = useState({});
  const [getFile, setGetFile] = useState([]);
  const [avatarCheckbox, setAvatarCheckbox] = useState([]);
  const [error, setError] = useState({});

  const [valueInputs, setValueInputs] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    status: "",
    sale: "",
    company: "",
    detail: "",
  });

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("token"));
    const accessToken = tokenData.token;
    const url = "http://localhost/laravel/laravel/public/api/user/product/";
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios.get(url + params.id, config).then((res) => {
      setData(res);
      setValueInputs({
        name: res.data.data.name,
        price: res.data.data.price,
        category: res.data.data.id_category,
        brand: res.data.data.id_brand,
        status: res.data.data.status,
        sale: res.data.data.sale,
        company: res.data.data.company_profile,
        detail: res.data.data.detail,
      });
      setGetFile(res.data.data.image);
    });
    axios
      .get("http://localhost/laravel/laravel/public/api/category-brand")
      .then((res) => {
        setBrand(res);
      });
  }, []);
  //
  // handle
  const handleFileImage = (e) => {
    const file = e.target.files;
    setGetFile(file);
  };

  const handleValues = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setValueInputs((state) => ({ ...state, [nameInput]: value }));
  };

  const handleCheckbox = (value) => {
    setAvatarCheckbox((prev) => {
      const iSChecked = avatarCheckbox.includes(value);
      if (iSChecked) {
        return avatarCheckbox.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;

    if (valueInputs.name === "") {
      errorSubmit.name = "Please enter your name";
      flag = false;
    }
    if (valueInputs.price === "") {
      errorSubmit.price = "Please enter the price";
      flag = false;
    }
    if (valueInputs.category === "") {
      errorSubmit.category = "Please select a category";
      flag = false;
    }
    if (valueInputs.brand === "") {
      errorSubmit.brand = "Please choose a brand";
      flag = false;
    }
    if (valueInputs.company === "") {
      errorSubmit.company = "Please do not leave it blank";
      flag = false;
    }
    if (getFile === "") {
      errorSubmit.getFile = "Please choose a photo";
      flag = false;
    }

    if (valueInputs.detail === "") {
      errorSubmit.detail = "Please write something";
      flag = false;
    }

    if (!flag) {
      setError(errorSubmit);
    } else {
      const tokenData = JSON.parse(localStorage.getItem("token"));
      const accessToken = tokenData.token;
      const id = data.data.data.id;
      const url =
        "http://localhost/laravel/laravel/public/api/user/edit-product/" + id;
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
        formData.append("name", valueInputs.name);
        formData.append("price", valueInputs.price);
        formData.append("category", valueInputs.category);
        formData.append("brand", valueInputs.brand);
        formData.append("company", valueInputs.company);
        formData.append("detail", valueInputs.detail);
        formData.append("status", valueInputs.status);
        formData.append("sale", valueInputs.sale);
        Object.keys(getFile).map((key) => {
          formData.append("file[]", getFile[key]);
        });
        avatarCheckbox.map((value) => {
          formData.append("avatarCheckBox[]", value);
        });
        axios.post(url, formData, config).then((res) => {
          console.log(res);
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            alert("thành công");
          }
        });
      }
    }
  };

  // render
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
    if (valueInputs.status === "0") {
      return (
        <input
          className="input_sale"
          type="text"
          value={valueInputs.sale}
          name="sale"
          onChange={handleValues}
        />
      );
    }
  };

  const renderImage = () => {
    if (Object.keys(data).length > 0) {
      const dataUser = data.data.data;
      const idUser = dataUser["id_user"];
      const image = dataUser["image"];
      return image.map((value, index) => {
        return (
          <>
            <li key={index} className="item_image">
              <img
                className="image_user"
                src={
                  "http://localhost/laravel/laravel/public/upload/user/product/" +
                  idUser +
                  "/" +
                  value
                }
                alt=""
              />
            </li>
            <div className="checkbox">
              <input
                type="checkbox"
                checked={avatarCheckbox.includes(value)}
                onChange={() => handleCheckbox(value)}
              />
            </div>
          </>
        );
      });
    }
  };

  return (
    <div className="col-sm-9">
      <div className="form_wrapper-add-product">
        <div className="Add_title">
          <h2>Edit Product</h2>
        </div>
        <form encType="multipart/form-data">
          <div className="input_field">
            <input
              className="inp inp_select"
              type="text"
              placeholder="Name"
              name="name"
              value={valueInputs.name}
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
              value={valueInputs.price}
              onChange={handleValues}
            />
            <div className="msg-error">{error.price ? error.price : null}</div>
          </div>
          <div className="input_field">
            <select
              className="inp inp_select"
              name="category"
              value={valueInputs.category}
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
              value={valueInputs.brand}
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
              value={valueInputs.status}
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
              value={valueInputs.company}
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
            <ul className="list_image">{renderImage()}</ul>
          </div>
          <div className="input_field">
            <textarea
              className="inp inp_select"
              type="text"
              placeholder="Detail"
              name="detail"
              value={valueInputs.detail}
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

export default EditProduct;

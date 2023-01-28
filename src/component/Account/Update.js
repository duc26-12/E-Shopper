import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaLock,
  FaPhoneAlt,
  FaMapMarker,
  FaFileImage,
} from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import axios from "axios";

const Update = () => {
  const [getFile, setGetFile] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState({});
  const [getValueInput, setGetValueInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("auth"));
    setGetValueInput({
      name: localUser.name,
      email: localUser.email,
      password: "",
      phone: localUser.phone,
      address: localUser.address,
    });
  }, []);

  const handleFileImage = (e) => {
    const file = e.target.files;

    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setGetFile(file[0]);
    };
    reader.readAsDataURL(file[0]);
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
    function isEmail(email) {
      var regax =
        /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regax.test(email);
    }

    if (getValueInput.email === "") {
      errorSubmit.email = "Please enter your email";
      flag = false;
    } else {
      if (!isEmail(getValueInput.email)) {
        errorSubmit.email = "Please enter correct email format";
        flag = false;
      }
    }
    if (getValueInput.phone === "") {
      errorSubmit.phone = "Please enter your phone";
      flag = false;
    }
    if (getValueInput.address === "") {
      errorSubmit.address = "Please enter your address";
      flag = false;
    }
    if (getFile === "") {
      errorSubmit.getFile = "Please choose a photo";
      flag = false;
    } else {
      if (getFile.length > 0) {
        if (getFile.size > 1024 * 1024) {
          errorSubmit.getFile =
            "Please choose a photo with a smaller resolution";
        }
        const photoTail = ["png", "jpg", "jpeg", "PNG", "JPG"];
        const photo = photoTail.map((photo) => {
          return photo;
        });
        const fileType = getFile.name.split(".")[1];
        const type = ["jpg", "png", "jpeg", "PNG", "JPG"];
        if (!type.includes(fileType)) {
          errorSubmit.getFile = `Please choose an image ending in: ${photo}`;
          flag = false;
        }
      }
    }

    if (!flag) {
      setError(errorSubmit);
    } else {
      const localUser = JSON.parse(localStorage.getItem("auth"));
      const localToken = JSON.parse(localStorage.getItem("token"));
      let accessToken = localToken.token;
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      const url =
        "http://localhost/laravel/laravel/public/api/user/update/" +
        localUser.id;

      const local = localStorage.getItem("login");
      if (local) {
        const formData = new FormData();
        formData.append("name", getValueInput.name);
        formData.append("email", getValueInput.email);
        formData.append("password", getValueInput.password);
        formData.append("phone", getValueInput.phone);
        formData.append("address", getValueInput.address);
        formData.append("avatar", avatar);
        formData.append("level", 0);
        axios.post(url, formData, config).then((res) => {
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            alert("update thành công");
            localStorage.setItem("auth", JSON.stringify(res.data.Auth));
          }
        });
      }
    }
  };

  return (
    <div className="col-sm-9">
      <div className="form_wrapper">
        <div className="title_container">
          <h2>User Update</h2>
        </div>
        <form encType="multipart/form-data">
          <div className="input_field">
            <FaUser className="icon" />
            <input
              className="inp"
              type="text"
              placeholder="Name"
              name="name"
              value={getValueInput.name}
              onChange={handleValues}
            />
            <div className="msg-error">{error.name ? error.name : null}</div>
          </div>
          <div className="input_field">
            <GrMail className="icon" />
            <input
              readOnly
              className="inp"
              type="text"
              placeholder="Email"
              name="email"
              value={getValueInput.email}
              onChange={handleValues}
            />
            <div className="msg-error">{error.email ? error.email : null}</div>
          </div>
          <div className="input_field">
            <FaLock className="icon" />
            <input
              className="inp"
              type="password"
              placeholder="Password"
              name="password"
              value={getValueInput.password}
              onChange={handleValues}
            />
            <div className="msg-error">
              {error.password ? error.password : null}
            </div>
          </div>
          <div className="input_field">
            <FaPhoneAlt className="icon" />
            <input
              className="inp"
              type="text"
              placeholder="Number phone"
              name="phone"
              value={getValueInput.phone}
              onChange={handleValues}
            />
            <div className="msg-error">{error.phone ? error.phone : null}</div>
          </div>
          <div className="input_field">
            <FaMapMarker className="icon" />
            <input
              className="inp"
              type="text"
              placeholder="Address"
              name="address"
              value={getValueInput.address}
              onChange={handleValues}
            />
            <div className="msg-error">
              {error.address ? error.address : null}
            </div>
          </div>
          <div className="input_field">
            <FaFileImage className="icon" />
            <input
              className="inp"
              type="file"
              name="avatar"
              onChange={handleFileImage}
            />
            <div className="msg-error">
              {error.getFile ? error.getFile : null}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Sing Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;

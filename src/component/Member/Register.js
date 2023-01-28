import React, { useState } from "react";
import axios from "axios";
import "./Member.scss";
import {
  FaUser,
  FaLock,
  FaPhoneAlt,
  FaMapMarker,
  FaFileImage,
} from "react-icons/fa";
import { GrMail } from "react-icons/gr";

const Register = () => {
  const [getValueInput, setGetValueInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [getFile, setGetFile] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState({});

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

    if (getValueInput.password === "") {
      errorSubmit.password = "Please enter your password";
      flag = false;
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
      const data = {
        name: getValueInput.name,
        email: getValueInput.email,
        password: getValueInput.password,
        phone: getValueInput.phone,
        address: getValueInput.address,
        avatar: avatar,
        level: 0,
      };
      axios
        .post("http://localhost/laravel/laravel/public/api/register", data)
        .then((res) => {
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            alert("đăng kí thành công");
          }
        });
    }
  };

  return (
    <div className="col-sm-9">
      <div className="form_wrapper">
        <div className="title_container">
          <h2>Register</h2>
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
              className="inp"
              type="email"
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

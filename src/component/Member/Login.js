import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { GrMail } from "react-icons/gr";

const Login = () => {
  const navigate = useNavigate();
  const [getValueInput, setGetValueInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleValues = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setGetValueInput((state) => ({ ...state, [nameInput]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;

    function isEmail(email) {
      var regax =
        /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regax.test(email);
    }
    if (!isEmail(getValueInput.email)) {
      errorSubmit.email = "Please enter correct email format";
      flag = false;
    }
    if (getValueInput.email === "") {
      errorSubmit.email = "Please enter your email";
      flag = false;
    }

    if (getValueInput.password === "") {
      errorSubmit.password = "Please enter your password";
      flag = false;
    }

    const data = {
      email: getValueInput.email,
      password: getValueInput.password,
      level: 0,
    };

    if (!flag) {
      setError(errorSubmit);
    } else {
      axios
        .post("http://localhost/laravel/laravel/public/api/login", data)
        .then((res) => {
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            navigate("/");
            localStorage.setItem("login", true);
            localStorage.setItem("token", JSON.stringify(res.data.success));
            localStorage.setItem("auth", JSON.stringify(res.data.Auth));
          }
        })
        .catch((err) => {
          console.log("hư rồi!");
        });
    }
  };

  return (
    <div className="col-sm-9">
      <div className="form_login">
        <div className="title_container">
          <h2>Login</h2>
        </div>
        <form>
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

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

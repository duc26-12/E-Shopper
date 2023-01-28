import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

const Rate = (props) => {
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios
      .get(
        "http://localhost/laravel/laravel/public/api/blog/rate/" + props.idBlog
      )
      .then((res) => {
        const rates = res.data.data;
        let count = 0;
        Object.keys(rates).map((key, index) => {
          return (count += rates[key]["rate"]);
        });
        setRating(count / Object.keys(rates).length);
      });
  });

  const url =
    "http://localhost/laravel/laravel/public/api/blog/rate/" + props.idBlog;
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const userData = JSON.parse(localStorage.getItem("auth"));
  let accessToken = tokenData.token;
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };

  function changeRating(newRating, name) {
    setRating(newRating);
    const local = localStorage.getItem("login");
    if (local) {
      if (rating) {
        const formData = new FormData();
        formData.append("blog_id", props.idBlog);
        formData.append("rate", newRating);
        formData.append("user_id", userData.id);
        axios.post(url, formData, config).then((res) => {});
      }
    } else {
      alert("vui lòng login");
      navigate("/login");
    }
  }
  return (
    <div className="rating-area">
      <ul className="ratings">
        <li className="rate-this">Rate this item:</li>
        <li>
          <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={6}
            name="rating"
          />
        </li>
        <li className="color">(6 votes)</li>
      </ul>
      <ul className="tag">
        <li>TAG:</li>
        <li>
          <a className="color" href="/">
            Pink <span>/</span>
          </a>
        </li>
        <li>
          <a className="color" href="/">
            T-Shirt <span>/</span>
          </a>
        </li>
        <li>
          <a className="color" href="/">
            Girls
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Rate;

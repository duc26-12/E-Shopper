import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Comments = (props) => {
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const inputRef = useRef(null);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const url =
    "http://localhost/laravel/laravel/public/api/blog/comment/" + props.idBlog;
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const userData = JSON.parse(localStorage.getItem("auth"));

  let accessToken = tokenData.token;

  let config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };

  const handlePost = (e) => {
    e.preventDefault();

    const local = localStorage.getItem("login");
    if (local) {
      if (comment) {
        const formData = new FormData();
        formData.append("id_blog", props.idBlog);
        formData.append("id_user", userData.id);
        formData.append("id_comment", props.idParent ? props.idParent : 0);
        formData.append("comment", comment);
        formData.append("image_user", userData.avatar);
        formData.append("name_user", userData.name);
        axios.post(url, formData, config).then((res) => {
          props.getCmt(res.data.data);
        });
      }
    } else {
      alert("vui lòng login");
      navigate("/login");
    }

    inputRef.current.focus();
    setComment("");
  };

  return (
    <div className="replay-box">
      <div className="row">
        <div className="col-sm-12">
          <h2>Leave a replay</h2>

          <div className="text-area">
            <div className="blank-arrow">
              <label>Your Name</label>
            </div>
            <span>*</span>
            <textarea
              ref={inputRef}
              name="message"
              rows="11"
              value={comment}
              onChange={handleComment}
            ></textarea>
            <button className="btn btn-primary" href="" onClick={handlePost}>
              post comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;

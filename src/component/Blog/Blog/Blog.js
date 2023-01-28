import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Blog = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost/laravel/laravel/public/api/blog")
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log("hihi"));
  }, []);

  const renderBlog = () => {
    if (Object.keys(data).length > 0) {
      const dataBlog = data.data.blog.data;
      return dataBlog.map((value) => {
        return (
          <div className="single-blog-post" key={value.id}>
            <h3>{value.title}</h3>
            <div className="post-meta">
              <ul>
                <li>
                  <i className="fa fa-user"></i> Mac Doe
                </li>
                <li>
                  <i className="fa fa-clock-o"></i> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar"></i> DEC 5, 2013
                </li>
              </ul>
              <span>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half-o"></i>
              </span>
            </div>
            <a href="/">
              <img
                src={
                  "http://localhost/laravel/laravel/public/upload/Blog/image/" +
                  value.image
                }
                alt=""
              />
            </a>
            <p>{value.description}</p>
            <Link className="btn btn-primary" to={"/blog/detail/" + value.id}>
              Read More
            </Link>
          </div>
        );
      });
    }
  };

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {renderBlog()}
      </div>
    </div>
  );
};

export default Blog;

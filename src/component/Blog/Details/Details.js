import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Rate from "../Comments/Rate";
import Comments from "../Comments/Comments";
import ListComments from "../Comments/ListComments";

const Details = () => {
  let params = useParams();

  const [data, setData] = useState("");
  const [listComments, setListComments] = useState("");
  const [idParent, setIdParent] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://localhost/laravel/laravel/public/api/blog/detail/" + params.id
      )
      .then((res) => {
        setListComments(res.data.data.comment);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("hihi");
      });
  }, []);

  const getCmt = (data) => {
    setListComments(listComments.concat(data));
  };

  const getID = (data) => {
    setIdParent(data);
  };

  const renderDetail = () => {
    if (Object.keys(data).length > 0) {
      return (
        <div className="single-blog-post" key={data.id}>
          <h3>{data.title}</h3>
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
          </div>
          <img
            src={
              "http://localhost/laravel/laravel/public/upload/Blog/image/" +
              data.image
            }
            alt=""
          />
          <p>{data.description}</p>
        </div>
      );
    }
  };

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {renderDetail()}
        <div className="pager-area">
          <ul className="pager pull-right">
            <li>
              <a href="/">Pre</a>
            </li>
            <li>
              <a href="/">Next</a>
            </li>
          </ul>
        </div>

        <Rate idBlog={params.id} />

        <div className="socials-share">
          <a href="/">
            <img src="images/blog/socials.png" alt="" />
          </a>
        </div>
      </div>
      <div className="response-area">
        <ListComments idBlog={params.id} data={listComments} getID={getID} />
        <Comments idBlog={params.id} getCmt={getCmt} idParent={idParent} />
      </div>
    </div>
  );
};

export default Details;

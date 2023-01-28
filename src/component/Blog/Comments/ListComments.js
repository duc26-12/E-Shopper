import React from "react";
import "./Comments.scss";

const ListComments = (props) => {
  const handleReply = (e) => {
    props.getID(e.target.id);
  };
  console.log(props.data);

  const renderResponse = () => {
    if (props.data.length > 0) {
      const lengthCmt = props.data.length;

      return <h2>{lengthCmt} RESPONSES</h2>;
    }
  };
  const renderComments = () => {
    if (props.data.length > 0) {
      return props.data.map((value, index) => {
        return (
          <li className="media" key={index}>
            <a className="pull-left" href="/">
              <img
                className="media-object"
                src={
                  "http://localhost/laravel/laravel/public/upload/user/avatar/" +
                  value.image_user
                }
                alt=""
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user"></i>
                  {value.name_user}
                </li>
                <li>
                  <i className="fa fa-clock-o"></i> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar"></i> DEC 5, 2013
                </li>
              </ul>
              <p>{value.comment}</p>
              <button
                className="btn btn-primary"
                id={value.id}
                onClick={handleReply}
              >
                <i className="fa fa-reply"></i>Replay
              </button>
            </div>
          </li>
        );
      });
    }
  };

  return (
    <div className="response-area">
      {renderResponse()}
      <ul className="media-list"></ul>
      {renderComments()}
    </div>
  );
};

export default ListComments;

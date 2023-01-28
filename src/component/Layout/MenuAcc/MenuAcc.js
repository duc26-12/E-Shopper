import React from "react";

const MenuAcc = () => {
  return (
    <div className="col-sm-3">
      <div className="left-sidebar">
        <h2>Category</h2>
        <div className="panel-group category-products" id="accordian">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a
                  data-toggle="collapse"
                  data-parent="#accordian"
                  href="#sportswear"
                >
                  <span className="badge pull-right">
                    <i className="fa fa-plus"></i>
                  </span>
                  Account
                </a>
              </h4>
            </div>
            <div id="sportswear" className="panel-collapse collapse">
              <div className="panel-body">
                <ul>
                  <li>
                    <a href="/">Nike </a>
                  </li>
                  <li>
                    <a href="/">Under Armour </a>
                  </li>
                  <li>
                    <a href="/">Adidas </a>
                  </li>
                  <li>
                    <a href="/">Puma</a>
                  </li>
                  <li>
                    <a href="/">ASICS </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a data-toggle="collapse" data-parent="#accordian" href="#mens">
                  <span className="badge pull-right">
                    <i className="fa fa-plus"></i>
                  </span>
                  My Product
                </a>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuAcc;

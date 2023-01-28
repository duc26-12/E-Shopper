import React, { useState, useEffect } from "react";
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost/laravel/laravel/public/api/product")
      .then((res) => setWishlist(res));
  }, []);

  const renderWishlist = () => {
    const getWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (Object.keys(wishlist).length > 0) {
      const data = wishlist.data.data;
      return data.map((value) => {});
    }
  };

  return <div>{renderWishlist()}</div>;
};

export default Wishlist;

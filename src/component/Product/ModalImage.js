import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { IoCloseSharp } from "react-icons/io5";

const ModalImage = (props) => {
  useEffect(() => {
    document.addEventListener("keydown", handleKey, true);
  }, []);

  const handleKey = (e) => {
    if (e.key === "Escape") {
      props.toggle(false);
    }
  };

  const handleClose = () => {
    props.toggle(false);
  };

  const renderModal = () => {
    if (Object.keys(props.data).length > 0) {
      const id = props.data.data.data.id_user;
      return (
        <div className="wrapper">
          <Modal.Dialog show="true">
            <Modal.Body>
              <IoCloseSharp className="icon_modal" onClick={handleClose} />
              <img
                className="image_check"
                src={
                  "http://localhost/laravel/laravel/public/upload/user/product/" +
                  id +
                  "/" +
                  props.image
                }
                alt=""
              />
            </Modal.Body>
          </Modal.Dialog>
        </div>
      );
    }
  };

  return props.Trigger ? <div>{renderModal()}</div> : "";
};

export default ModalImage;

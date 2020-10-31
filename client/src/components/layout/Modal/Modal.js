import React, { forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";

const Modal = forwardRef((props, ref) => {
  const [display, setDisplay] = React.useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      close: () => close(),
    };
  });

  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  if (display) {
    return ReactDOM.createPortal(
      <div className={"Mymodal-wrapper"}>
        <div onClick={close} className={"Mymodal-backdrop"} />
        <div className={"Mymodal-box"}>{props.children}</div>
      </div>,
      document.getElementById("root")
    );
  }

  return null;
});

export default Modal;

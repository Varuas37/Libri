import React, { forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";

const TopModal = forwardRef((props, ref) => {
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
      <div className={"TopModal-wrapper"}>
        <div onClick={close} className={"TopModal-backdrop"} />
        <div className={"TopModal-box"}>{props.children}</div>
      </div>,
      document.getElementById("root")
    );
  }

  return null;
});

export default TopModal;

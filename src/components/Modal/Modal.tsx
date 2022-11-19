import React from "react";
import clsx from "clsx";
import "./Modal.scss";
import { ModalProps } from "./Modal.interface";

export const Modal: React.FC<ModalProps> = (props) => {
  const { children, isHide } = props;
  return (
    <div className={clsx("overlay", { overlayHid: isHide })}>
      <div className="modalContainer">{children}</div>
    </div>
  );
};

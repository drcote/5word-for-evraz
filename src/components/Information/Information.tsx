import React from "react";
import "./Information.scss";
import { InformationProps, TypeMessage } from "./Information.interface";

export const Information: React.FC<InformationProps> = (props) => {
  const {
    information: { message, typeMessage },
  } = props;
  return (
    <div className="information">
      <div>{typeMessage}</div>
      {typeMessage !== TypeMessage.End ? <div>{message}</div> : null}
      {/* <div>Ваше место в рейтинге: 1</div> */}
    </div>
  );
};

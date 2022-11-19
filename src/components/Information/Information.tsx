import React from "react";
import "./Information.scss";
import { InformationProps, TypeMessage } from "./Infortation.interface";

export const Information: React.FC<InformationProps> = (props) => {
  const { typeMessage } = props;
  return (
    <div className="information">
      <div>{typeMessage}</div>
      {typeMessage !== TypeMessage.End ? <div>00:00:00</div> : null}
      <div>Ваше место в рейтинге: 1</div>
    </div>
  );
};

import React from "react";
import "./Card.css";
const Card = (props) => {
  return (
    <div className="card">
      <div className="card-title text-center">{props.cardTitle}</div>
      <img src={props.img} alt="" />
    </div>
  );
};

export default Card;

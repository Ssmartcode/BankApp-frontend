import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-img-top">
        <img src={props.img} alt="" />
      </div>
      <div className="card-body">
        <div className="card-title">{props.title}</div>
        <div className="card-text">{props.text}</div>
      </div>
    </div>
  );
};

export default Card;

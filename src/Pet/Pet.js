import React from "react";
import "./Pet.css";

const Pet = props => {
  return (
    <div className="Pet">
      <div className="Pet__image">
        <img
          src={props.image}
          alt={`Missing thumbnail of a ${props.petType}`}
        />
      </div>
      <div className="Pet__description">
        <h3>Pet type: {props.petType}.</h3>
        <h4>Breed: {props.petBreed}</h4>
        <h4>Name: {props.name}</h4>
        <h4>Gender: {props.petGender}</h4>
        <h5>Pet location: {props.petLocation}</h5>
      </div>
    </div>
  );
};

export default Pet;

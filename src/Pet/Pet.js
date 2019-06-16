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
        <h3>
          Pet type: <span>{props.petType}</span>.
        </h3>
        <h4>
          Breed: <span>{props.petBreed}</span>.
        </h4>
        <h4>
          Name: <span>{props.name}</span>.
        </h4>
        <h4>
          Gender: <span>{props.petGender}</span>.
        </h4>
        <h4>
          Pet location: <span>{props.petLocation}</span>.
        </h4>
      </div>
    </div>
  );
};

export default Pet;

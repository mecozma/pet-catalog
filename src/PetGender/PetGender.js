import React from "react";
import "./PetGender.css";

const PetGender = ({ selectedGender, selectedGenderHandler, petGenders }) => {
  return (
    <div className="PetGender">
      <select
       onChange={selectedGenderHandler}>
        {petGenders.map((gender, i) => {
          return (
            <option key={i} value={gender}>
              {gender}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default PetGender;

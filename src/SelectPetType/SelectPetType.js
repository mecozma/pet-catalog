import React from "react";
import PropTypes from "prop-types";
import "./SelectPetType.css";

const SelectPetType = ({ petType, selectedPetHandler }) => {
  return (
    <div className="SelectPetType">
      <select onChange={e => selectedPetHandler(e.target.value)}>
        {petType.map((el, i) => {
          return (
            <option key={el + i} value={el}>
              {el}
            </option>
          );
        })}
      </select>
    </div>
  );
};

SelectPetType.petTypes = {
  petType: PropTypes.array.isRequired,
  selectedPetHandler: PropTypes.func.isRequired
};

export default SelectPetType;

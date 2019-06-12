import React from "react";
import PropTypes from "prop-types";

const SelectPetType = ({ petType, selectedPetHandler }) => {
  return (
    <select onChange={e => selectedPetHandler(e.target.value)}>
      {petType.map((el, i) => {
        return (
          <option key={el + i} value={el}>
            {el}
          </option>
        );
      })}
    </select>
  );
};

SelectPetType.petTypes = {
  petType: PropTypes.array.isRequired,
  selectedPetHandler: PropTypes.func.isRequired
};

export default SelectPetType;

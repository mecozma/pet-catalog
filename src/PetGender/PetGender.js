import React from "react";

const PetGender = ({ selectedGender, selectedGenderHandler }) => {
  return (
    <fieldset>
      <legend>Pet gender</legend>
      <label>
        <input
          id="male"
          onChange={e => selectedGenderHandler(e)}
          value="Male"
          type="radio"
          name="pet-gender"
          checked={selectedGender === "Male"}
        />
        Male
      </label>

      <label>
        <input
          onChange={e => selectedGenderHandler(e)}
          value="Female"
          id="female"
          type="radio"
          name="pet-gender"
          checked={selectedGender === "Female"}
        />{" "}
        Female
      </label>
    </fieldset>
  );
};

export default PetGender;

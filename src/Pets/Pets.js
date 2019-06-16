import React from "react";
import Pet from "../Pet/Pet";
import "./Pets.css";

const Pets = ({ pets, selectedPet, selectedGender, inputValue, showPets }) => {
  let filteredPets = [...pets];

  if (selectedPet && selectedPet !== "All Pets")
    filteredPets = filteredPets.filter(pet => pet.animal_type === selectedPet);
  if (selectedGender)
    filteredPets = filteredPets.filter(
      pet => pet.Animal_Gender === selectedGender
    );
  if (inputValue)
    filteredPets = filteredPets.filter(pet => pet.Address === inputValue);
  if (filteredPets.length === 0) return <div>No pets</div>;
  return (
    <div className="Pets">
      {showPets
        ? filteredPets.map((pet, i) => {
            return (
              <Pet
                key={pet.Animal_ID + i}
                name={pet.Animal_Name}
                petType={pet.animal_type}
                petGender={pet.Animal_Gender}
                petBreed={pet.Animal_Breed}
                petLocation={pet.Address}
                image={pet.Image}
              />
            );
          })
        : null}
    </div>
  );
};

export default Pets;

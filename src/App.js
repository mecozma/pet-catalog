import React, { Component } from "react";
import Pet from "./Pet/Pet";
import SelectPetType from "./SelectPetType/SelectPetType";
import PetGender from "./PetGender/PetGender";
import "./App.css";

import Tabletop from "tabletop";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pets: [],
      petType: [],
      selectedPet: "",
      selectedGender: ""
    };
  }

  /* ComponentDidMount() is invoked immediately after a component is mounted. 
Initialization that requires DOM nodes should go here. If you need to load
 data from a remote endpoint, this is a good place to instantiate the network
  request. Setting state in this method will trigger a re-rendering. */
  componentDidMount() {
    Tabletop.init({
      key: "1IS_wjEiG_nUrnoOa49wOijx2Fgg5inYHYzpZePPnfn0",
      callback: googleData => {
        let animalType = ["All Pets"];
        googleData.map(el => {
          return (
            !animalType.includes(el.animal_type) &&
            animalType.push(el.animal_type)
          );
        });
        console.log(googleData);
        this.setState({
          pets: googleData,
          isLoading: false,
          petType: animalType
        });
      },
      simpleSheet: true
    });
  }

  selectedPetHandler = e => {
    this.setState({
      selectedPet: e
    });
  };

  selectGenderHandler = e => {
    this.setState({
      selectedGender: e.target.value
    });
    console.log("selected gender", e.target.value);
  };

  render() {
    const {
      isLoading,
      pets,
      petType,
      selectedPet,
      selectedGender
    } = this.state;
    return (
      <div className="App">
        <h1>Pet Catalog</h1>
        <SelectPetType
          selectedPetHandler={this.selectedPetHandler}
          petType={petType}
        />

        <PetGender
          selectedGenderHandler={this.selectGenderHandler}
          selectedGender={selectedGender}
        />

        {/* If isLoading property is false and the array pets is no empty anymore,
         the .map method will iterate through the array and will return a list of 
         all the pets in the array*/}

        {!isLoading &&
        pets.length > 0 &&
        selectedPet.length > 0 &&
        !selectedGender
          ? pets
              .filter(pet => {
                return pet.animal_type === selectedPet;
              })
              .map((pet, i) => {
                return (
                  <Pet
                    key={pet.Animal_ID + i}
                    name={pet.Animal_Name}
                    petType={pet.animal_type}
                    petBreed={pet.Animal_Breed}
                    petLocation={pet.Address}
                  />
                );
              })
          : pets
              .filter(pet => pet.Animal_Gender === selectedGender)
              .map((pet, i) => {
                return (
                  <Pet
                    key={pet.Animal_ID + i}
                    name={pet.Animal_Name}
                    petType={pet.animal_type}
                    petGender={pet.Animal_Gender}
                    petBreed={pet.Animal_Breed}
                    petLocation={pet.Address}
                  />
                );
              })}
        {isLoading ? <div>Loading...</div> : null}
      </div>
    );
  }
}

export default App;

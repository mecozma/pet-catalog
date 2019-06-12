import React, { Component } from "react";
import Pet from "./Pet/Pet";
import SelectPetType from "./SelectPetType/SelectPetType";
import "./App.css";

import Tabletop from "tabletop";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pets: [],
      petType: [],
      selectedPet: ""
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

  render() {
    const { isLoading, pets, petType, selectedPet } = this.state;

    return (
      <div className="App">
        <h1>Pet Catalog</h1>
        <SelectPetType
          selectedPetHandler={this.selectedPetHandler}
          petType={petType}
        />
        {/* If isLoading property is false and the array pets is no empty anymore,
         the .map method will iterate through the array and will return a list of 
         all the pets in the array*/}

        {!isLoading && pets.length > 0 && selectedPet.length > 0
          ? pets
              .filter(pet => pet.animal_type === selectedPet)
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
          : pets.map((pet, i) => {
              return (
                <Pet
                  key={pet.Animal_ID + i}
                  name={pet.Animal_Name}
                  petType={pet.animal_type}
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

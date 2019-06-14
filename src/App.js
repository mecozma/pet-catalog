import React, { Component } from "react";
import Pets from "./Pets/Pets";
import SelectPetType from "./SelectPetType/SelectPetType";
import PetGender from "./PetGender/PetGender";

import "./App.css";

import Tabletop from "tabletop";
import SearchAddress from "./SearchAddress/SearchAddress";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pets: [],
      petType: [],
      petGenders: [],
      selectedPet: "",
      selectedGender: "",
      petAddress: [],
      suggestions: [],
      inputValue: ""
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

        let animalAddress = [];
        googleData.map(el => {
          return (
            !animalAddress.includes(el.Address) &&
            animalAddress.push(el.Address)
          );
        });

        let animalGenders = [];
        googleData.map(
          el =>
            !animalGenders.includes(el.Animal_Gender) &&
            animalGenders.push(el.Animal_Gender)
        );

        console.log(googleData);
        this.setState({
          pets: googleData,
          isLoading: false,
          petType: animalType,
          petAddress: animalAddress,
          petGenders: animalGenders
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

  addressInputHandler = e => {
    const { petAddress } = this.state;
    let value = e;
    let suggestionsS = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestionsS = petAddress.sort().filter(el => regex.test(el));
    }
    console.log(e);
    this.setState({
      suggestions: suggestionsS,
      inputValue: value
    });
  };

  suggestionSelected = value => {
    this.setState({
      inputValue: value,
      suggestions: []
    });
  };

  render() {
    const {
      isLoading,
      pets,
      petType,
      selectedPet,
      selectedGender,
      petAddress,
      suggestions,
      inputValue,
      petGenders
    } = this.state;

    console.log(this.state);
    return (
      <div className="App">
        <h1>Pet Catalog</h1>
        <div className="App__searchAddress">
          <h3>Select pet category</h3>
          <SelectPetType
            selectedPetHandler={this.selectedPetHandler}
            petType={petType}
          />
        </div>

        <div className="App__searchAddress">
          <h3>Select gender</h3>
          <PetGender
            selectedGenderHandler={this.selectGenderHandler}
            petGenders={petGenders}
            selectedGender={selectedGender}
          />
        </div>

        <div className="App__searchAddress">
          <h3>Select address</h3>
          <SearchAddress
            onclick={this.suggestionSelected}
            onchange={this.addressInputHandler}
            addresses={petAddress}
            text={inputValue}
            suggestions={suggestions}
          />
        </div>

        {/* If isLoading property is false and the array pets is no empty anymore,
         the .map method will iterate through the array and will return a list of 
         all the pets in the array*/}

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Pets
            pets={pets}
            selectedPet={selectedPet}
            selectedGender={selectedGender}
            inputValue={inputValue}
          />
        )}
      </div>
    );
  }
}

export default App;

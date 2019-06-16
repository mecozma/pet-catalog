import React, { Component } from "react";
import Pets from "./Pets/Pets";
import SelectPetType from "./SelectPetType/SelectPetType";
import PetGender from "./PetGender/PetGender";
import SearchAddress from "./SearchAddress/SearchAddress";
import Spinner from "./Spinner/Spinner";
import Button from "./Button/Button";
import classes from "./App.module.css";

import Tabletop from "tabletop";

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
      inputValue: "",
      showPets: false
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
        let animalType = ["All pet types"];
        googleData.map(el => {
          return (
            !animalType.includes(el.animal_type) &&
            animalType.push(el.animal_type)
          );
        });
        // creates an array all the adresses from the api
        let animalAddress = [];
        googleData.map(el => {
          return (
            !animalAddress.includes(el.Address) &&
            animalAddress.push(el.Address)
          );
        });
        // creates an array of all the pet's genders from the api
        let animalGenders = ["All genders"];
        googleData.map(
          el =>
            !animalGenders.includes(el.Animal_Gender) &&
            animalGenders.push(el.Animal_Gender)
        );
        // sets state with the arays created above and the data from the api
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

  // Sets state to the selected pet
  selectedPetHandler = e => {
    this.setState({
      selectedPet: e
    });
  };
  // Sets state to the selected pet's gender
  selectGenderHandler = e => {
    this.setState({
      selectedGender: e.target.value
    });
    console.log("selected gender", e.target.value);
  };
  // Sets state to the selected address and filters the suggested addresses
  addressInputHandler = e => {
    const { petAddress } = this.state;
    let value = e;
    let suggestionsS = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestionsS = petAddress.sort().filter(el => regex.test(el));
    }

    this.setState({
      suggestions: suggestionsS,
      inputValue: value
    });
  };

  // Sets state with the selected address from the suggestions list
  suggestionSelected = value => {
    this.setState({
      inputValue: value,
      suggestions: []
    });
  };

  giveMePetsHandler = () => {
    this.setState({
      showPets: true
    });
    console.log("Give me pets");
  };

  clearSelectionHandler = () => {
    this.setState({
      showPets: false,
      selectedPet: "",
      selectedGender: "",
      petAddress: [],

      inputValue: ""
    });
    console.log("Clear selection");
  };

  render() {
    // destructured state
    const {
      isLoading,
      pets,
      petType,
      selectedPet,
      selectedGender,
      petAddress,
      suggestions,
      inputValue,
      petGenders,
      showPets
    } = this.state;

    return (
      <div className={classes.App}>
        <h1>Pet Catalog</h1>
        <div className={classes.App__searchField}>
          <SelectPetType
            selectedPetHandler={this.selectedPetHandler}
            petType={petType}
          />
        </div>

        <div className={classes.App__searchField}>
          <PetGender
            selectedGenderHandler={this.selectGenderHandler}
            petGenders={petGenders}
            selectedGender={selectedGender}
          />
        </div>

        <div className={classes.App__searchField}>
          <SearchAddress
            onclick={this.suggestionSelected}
            onchange={this.addressInputHandler}
            addresses={petAddress}
            text={inputValue}
            suggestions={suggestions}
          />
        </div>
        <Button clicked={this.clearSelectionHandler} btnType="Danger">
          Clear selection
        </Button>
        <Button clicked={this.giveMePetsHandler} btnType="Success">
          Give me pets
        </Button>
        {/* 
        If Is loading property is true the spinner will show otherwise a list of all the pets will be rendered
        */}

        {isLoading ? (
          <Spinner />
        ) : (
          <Pets
            pets={pets}
            selectedPet={selectedPet}
            selectedGender={selectedGender}
            inputValue={inputValue}
            showPets={showPets}
          />
        )}
      </div>
    );
  }
}

export default App;

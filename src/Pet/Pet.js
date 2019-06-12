import React from 'react';
import './Pet.css';

const Pet = (props) => {
  return(
    <div className="Pet">
      <h3>Pet type: {props.petType}. Breed: {props.petBreed}</h3>
      <h4>Name:  {props.name}</h4>
      <h5>Pet location: {props.petLocation}</h5>
    </div>
  )
}

export default Pet;
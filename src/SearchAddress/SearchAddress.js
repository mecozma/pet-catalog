import React from "react";
import "./SearchAddress.css";

const SearchAddress = ({ onchange, suggestions, text, onclick }) => {
  let suggestion;

  if (suggestions.length === 0) {
    suggestion = null;
  } else {
    suggestion = suggestions.map((address, i) => (
      <li onClick={() => onclick(address)} key={i}>
        {address}
      </li>
    ));
  }

  return (
    <div className="SearchAddress">
      <input
        value={text}
        onChange={e => onchange(e.target.value)}
        type="text"
        placeholder="Search by address"
      />
      <ul>{suggestion}</ul>
    </div>
  );
};

export default SearchAddress;

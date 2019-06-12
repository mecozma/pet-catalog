import React from 'react';

const SearchAddress = ({ onchange, suggestions, text, onclick }) => {
    let suggestion;

    if (suggestions.length === 0) {
     suggestion = null
    } else {
        suggestion = suggestions.map((address, i) => <li onClick={()=>onclick(address)} key={i}>{address}</li>)
    }
  
  return(
    <div>
    <input
    value={text}
    onChange={(e) => onchange(e.target.value)}
     type="text" />
      <ul>
        {
          suggestion
        }
      </ul>
    </div>
  )
}

export default SearchAddress;
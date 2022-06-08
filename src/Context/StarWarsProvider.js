import React, { useState } from 'react';
import StarsWarsContext from './StarsWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);

  const contextValue = {
    data,
    setData,
  };

  return (
    <StarsWarsContext.Provider value={ { contextValue } }>
      { children }
    </StarsWarsContext.Provider>
  );
}

export default StarWarsProvider;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;

import React, { /* useContext, */ useEffect, useState } from 'react';
// import StarsWarsContext from '../Context/StarsWarsContext';

function Table() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [textFilter, setTextFilter] = useState('');
  const [filterType, setFilterType] = useState(/population/i);
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState(0);
  const [numericFilter, setNumericFilter] = useState([]);

  /*  const { data, setData } useContext(StarsWarsContext) */

  useEffect(() => {
    const fetchTable = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const json = await response.json();
      const apiData = json.results.filter((i) => delete i.residents);
      setData(apiData);
      // results.map((e) => {
      //   delete e.residents;
      //   return e;
      // });

      console.log(json);
      setData(json.results);
      setFilteredData(json.results);
    };
    fetchTable();
  }, []);

  useEffect(() => {
    const filteredTitleData = data.filter((item) => item.name.toLowerCase()
      .includes(textFilter));
    setFilteredData(filteredTitleData);
  }, [data, textFilter]);

  // const handleClick = () => {
  //   setData([...data, textFilter]);
  // };

  const handleTextFilter = ({ target }) => {
    setTextFilter(target.value.toLowerCase());
  };

  const handleNumericFilter = () => {
    const newNumericFilter = {
      filterType,
      operator,
      value,
    };

    setNumericFilter([...newNumericFilter, numericFilter]);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search"
          onChange={ handleTextFilter }
          data-testid="name-filter"
        />
        <label htmlFor="textFilter">
          {' '}
          Coluna
          <select
            onChange={ ({ target }) => setFilterType(target.value) }
            data-testid="column-filter"
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="order-filter">
          Operador
          <select
            onChange={ ({ target }) => setOperator(target.value) }
            data-testid="comparison-filter"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>

        <input
          type="number"
          onChange={ ({ target }) => setValue(target.value) }
          data-testid="value-filter"
          placeholder="0"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleNumericFilter }
        >
          Filtrar
        </button>
      </form>
      {numericFilter.map((item) => (
        <div key={ item.filterType }>
          <p>
            {item.filterType}
            {item.operator}
            {item.value}
          </p>
        </div>
      ))}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={ item.name }>
              <td>{item.name}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.diameter}</td>
              <td>{item.climate}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>{item.films}</td>
              <td>{item.created}</td>
              <td>{item.edited}</td>
              <td>{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

import React, { useEffect, useState } from 'react';

function Table() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [textFilter, setTitleFilter] = useState('');

  useEffect(() => {
    const fetchTable = async () => {
      const response = await fetch(
        'https://swapi-trybe.herokuapp.com/api/planets/',
      );
      const data = await response.json();
      console.log(data);
      setData(data.results);
      setFilteredData(data.results);
    };
    fetchTable();
  }, []);

  useEffect(() => {
    const filteredTitleData = data.filter((item) => item.name.toLowerCase()
      .includes(textFilter));
    setData(filteredTitleData);
  }, [textFilter]);

  const handleFilter = ({ target }) => {
    setTitleFilter(target.value.toLowerCase());
  };

  return (
    <div>
      <form>
        <input type="text" placeholder="Search" onChange={ handleFilter } />
        <label htmlFor="textFilter">
          {' '}
          Coluna
          <select data-testid="column-filter">
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="order-filter">
          Operador
          <select data-testid="comparison-filter">
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>

        <label htmlFor="value-filter">
          <input type="number" data-testid="value-filter" />
          <button type="submit" data-testid="button-filter">
            Filtrar
          </button>
        </label>
      </form>
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
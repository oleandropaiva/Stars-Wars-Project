// import { click } from '@testing-library/user-event/dist/click';
import React, { useEffect, useState } from 'react';

function Table() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [textFilter, setTextFilter] = useState('');
  const [filterType, setFilterType] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState(0);
  const [numericFilter, setNumericFilter] = useState([]);
  const [column, setColumn] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [valueOperator, setValueOperator] = useState([
    'maior que', 'menor que', 'igual a']);

  useEffect(() => {
    const fetchTable = async () => {
      const response = await fetch(
        'https://swapi-trybe.herokuapp.com/api/planets/',
      );
      const json = await response.json();
      const apiData = json.results.filter((i) => delete i.residents);
      setData(apiData);

      // console.log(json);
      setData(json.results);
      setFilteredData(json.results);
    };
    fetchTable();
  }, []);

  useEffect(() => {
    const filteredTitleData = data.filter((item) => item.name
      .toLowerCase().includes(textFilter));

    const resultFiltered = numericFilter.reduce(
      (acc, filter) => acc.filter((item) => {
        console.log(filter.operator);
        switch (filter.operator) {
        case 'maior que':
          return Number(item[filter.filterType]) > Number(filter.value);
        case 'menor que':
          return Number(item[filter.filterType]) < Number(filter.value);
        case 'igual a':
          return Number(item[filter.filterType]) === Number(filter.value);
        default:
          return true;
        }
      }),
      filteredTitleData,
    );

    setFilteredData(resultFiltered);
  }, [data, textFilter, numericFilter]);

  const handleTextFilter = ({ target }) => {
    setTextFilter(target.value.toLowerCase());
  };

  const handleNumericFilter = () => {
    const newNumericFilter = {
      filterType,
      operator,
      value,
    };
    const filterDelete = column.filter((item) => item !== filterType);
    setColumn(filterDelete);
    setNumericFilter([...numericFilter, newNumericFilter]);
    setFilterType('population');
    setOperator('maior que');
    setValue(0);
  };

  function clickRemove() {
    setNumericFilter([]);
    setValue('0');
  }

  function deleteFilter(filter) {
    setNumericFilter(numericFilter.filter((item) => item !== filter));
    setColumn([...column, filter.column]);
    setValueOperator([...valueOperator, filter.valueOperator]);
  }

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
            value={ filterType }
            onChange={ ({ target }) => setFilterType(target.value) }
            data-testid="column-filter"
          >
            { column.map((item, index) => <option key={ index }>{ item }</option>)}
          </select>
        </label>
        <label htmlFor="order-filter">
          Operador
          <select
            // value={ operator }
            onChange={ ({ target }) => setOperator(target.value) }
            data-testid="comparison-filter"
          >
            { valueOperator.map((item, index) => <option key={ index }>{ item }</option>)}

            {/* <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option> */}
          </select>
        </label>

        <input
          type="number"
          value={ value }
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

        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ clickRemove }
        >
          Remover Filtros

        </button>

      </form>
      {numericFilter.map((filter, index) => (
        <p
          key={ `${filter.filterType}-${index}` }
          data-testid="filter"
        >
          {`
        ${filter.filterType}
        ${filter.operator}
        ${filter.value}
      `}
          <button
            type="button"
            onClick={ () => deleteFilter(filter) }
          >
            Excluir
          </button>
        </p>
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

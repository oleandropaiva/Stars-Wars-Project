import { useEffect, useState } from 'react';

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTable = async () => {
      const response = await fetch(
        'https://swapi-trybe.herokuapp.com/api/planets/',
      );
      const data = await response.json();
      /* console.log(data); */
      setData(data.results);
    };
    fetchTable();
  }, []);
  return (
    <div>
      <table>
        <thead>
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
        </thead>
      </table>
    </div>
  );
}

export default Table;

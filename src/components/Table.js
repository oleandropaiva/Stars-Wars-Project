import { useEffect } from 'react';

function Table() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <table>
        
      </table>
    </div>
  );
}

export default Table;

// https://swapi-trybe.herokuapp.com/api/planets/

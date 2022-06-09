import React from 'react';
import './App.css';
import Table from './components/Table';
import StarWarsProvider from './Context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <div className="App">
        <Table />
      </div>

    </StarWarsProvider>
  );
}
export default App;

import React from 'react';
import './App.css';

function App() {

  const handleApiRequest = (endpoint) => {
    fetch(`http://localhost:8080/${endpoint}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error('Fetch error:', error.toString()));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>API Test</h1>
        <button onClick={() => handleApiRequest('inventory')} className="App-link">Fetch Inventory</button>
        <button onClick={() => handleApiRequest('newpart')} className="App-link">Add New Part</button>
        <button onClick={() => handleApiRequest('addInventory')} className="App-link">Add Inventory</button>
        <button onClick={() => handleApiRequest('quantity/SKU123')} className="App-link">Get Part Quantity</button>
        <button onClick={() => handleApiRequest('partinfo/SKU123')} className="App-link">Get Part Info</button>
        <button onClick={() => handleApiRequest('search?class=Resistor')} className="App-link">Search Parts</button>
      </header>
    </div>
  );
}

export default App;

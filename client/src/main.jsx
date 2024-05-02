import React, { useState } from 'react';
import './App.css';
import InventoryList from './InventoryList';
import AddPart from './addPart';
import AddInventory from './addInventory';
import GetPartQuantity from './getQuantity';
import GetPartInfo from './getPart';
import SearchParts from './SearchParts';

function App() {
  const [activeComponent, setActiveComponent] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>API Test</h1>
        <button onClick={() => setActiveComponent('InventoryList')} className="App-link">Show Inventory</button>
        <button onClick={() => setActiveComponent('AddPart')} className="App-link">Add New Part</button>
        <button onClick={() => setActiveComponent('AddInventory')} className="App-link">Add Inventory</button>
        <button onClick={() => setActiveComponent('GetPartQuantity')} className="App-link">Get Part Quantity</button>
        <button onClick={() => setActiveComponent('GetPartInfo')} className="App-link">Get Part Info</button>
        <button onClick={() => setActiveComponent('SearchParts')} className="App-link">Search Parts</button>

        {activeComponent === 'InventoryList' && <InventoryList />}
        {activeComponent === 'AddPart' && <AddPart />}
        {activeComponent === 'AddInventory' && <AddInventory />}
        {activeComponent === 'GetPartQuantity' && <GetPartQuantity />}
        {activeComponent === 'GetPartInfo' && <GetPartInfo />}
        {activeComponent === 'SearchParts' && <SearchParts />}
      </header>
    </div>
  );
}

export default App;

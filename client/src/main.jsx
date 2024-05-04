import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import InventoryList from './InventoryList';
import AddPart from './addPart';
import AddInventory from './addInventory';
import GetPartQuantity from './getQuantity';
import GetPartInfo from './getPart';
import SearchParts from './SearchParts';
import DeletePart from './deletePart';

//Main navigation for website
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Run of the MIL API</h1>
          <nav>
            <Link to="/inventory" className="App-link">Show Inventory</Link>
            <Link to="/add-part" className="App-link">Add New Part</Link>
            <Link to="/add-inventory" className="App-link">Add Inventory</Link>
            <Link to="/quantity" className="App-link">Get Part Quantity</Link>
            <Link to="/info" className="App-link">Get Part Info</Link>
            <Link to="/search" className="App-link">Search Parts</Link>
            <Link to="/delete" className="App-link">Delete Part</Link>
          </nav>
          <Routes>
            <Route path="/inventory" element={<InventoryList />} />
            <Route path="/add-part" element={<AddPart />} />
            <Route path="/add-inventory" element={<AddInventory />} />
            <Route path="/quantity" element={<GetPartQuantity />} />
            <Route path="/info" element={<GetPartInfo />} />
            <Route path="/search" element={<SearchParts />} />
            <Route path="/delete" element={<DeletePart />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;

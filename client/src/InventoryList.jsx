import React, { useState, useEffect } from 'react';
import './index.css';  // Make sure to create this CSS file

function InventoryList() {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        fetch('/inventory')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setParts(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, []);

    return (
        <div className="inventory-list">
            <h1>Inventory List</h1>
            {parts.length > 0 ? (
                parts.map(part => (
                    <div key={part._id} className="inventory-item">
                        <div><strong>SKU:</strong> {part.sku}</div>
                        <div><strong>Quantity:</strong> {part.quantity}</div>
                    </div>
                ))
            ) : (
                <p>No parts found in inventory.</p>
            )}
        </div>
    );
}

export default InventoryList;

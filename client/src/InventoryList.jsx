import React, { useState, useEffect } from 'react';

function InventoryList() {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        fetch('/inventory')  // Make sure this URL is correct for your API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setParts(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, []);  // The empty array ensures this effect runs only once after the component mounts

    return (
        <div>
            <h1>Inventory List</h1>
            {parts.length > 0 ? (
                <ul>
                    {parts.map(part => (
                        <li key={part._id}>
                            SKU: {part.sku}, Class: {part.class}, Quantity: {part.quantity}
                            <ul>
                                {Object.entries(part.characteristics).map(([key, value]) => (
                                    <li key={key}>{key}: {value instanceof Object ? JSON.stringify(value) : value}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No parts found in inventory.</p>
            )}
        </div>
    );
}

export default InventoryList;

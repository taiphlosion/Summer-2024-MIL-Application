import React, { useState } from 'react';
import './index.css';  // Make sure to create this CSS file

function GetPartQuantity() {
    const [sku, setSKU] = useState('');
    const [part, setPart] = useState(null);
    const [error, setError] = useState('');

    const fetchpartsQuantity = (sku) => {
        fetch(`/quantity/${sku}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setPart(data);
                setError('');
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setError(`No parts were found or invalid SKU.`);
                setPart(null);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchpartsQuantity(sku);
    };

    return (
        <div className="inventory-list">
            <h1>Part Quantity</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={sku}
                    onChange={e => setSKU(e.target.value)}
                    placeholder="Enter SKU"
                />
                <button type="submit">Get Quantity</button>
            </form>

            {part? (
                <div className="inventory-item">
                    <div><strong>SKU:</strong> {part.sku}</div>
                    <div><strong>Quantity:</strong> {part.quantity}</div>
                </div>
            ) : (
                error ? <p>{error}</p> : <p>Please input a valid SKU</p>
            )}
        </div>
    );
}

export default GetPartQuantity;

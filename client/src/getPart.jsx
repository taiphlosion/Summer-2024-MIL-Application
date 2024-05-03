import React, { useState } from 'react';
import './index.css';  // Make sure to create this CSS file

function formatCharacteristics(key) {
    return key
        // Split the string at each capital letter (for camelCase)
        .split(/(?=[A-Z])/)
        // Capitalize the first letter of each word and join them with space
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function GetPartInfo() {
    const [sku, setSKU] = useState('');
    const [part, setPart] = useState(null);
    const [error, setError] = useState('');

    const fetchpartsQuantity = (sku) => {
        fetch(`/partinfo/${sku}`)
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
            <h1>Part Information</h1>
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
                    <div className="characteristics">
                        {Object.entries(part.characteristics).map(([key, value]) => (
                            <div key={key} className="characteristic-item">
                                <strong>{formatCharacteristics(key)}:</strong> {typeof value === 'object' && value.$numberDecimal ? value.$numberDecimal : value}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                error ? <p>{error}</p> : <p>Please input a valid SKU</p>
            )}
        </div>
    );
}

export default GetPartInfo;

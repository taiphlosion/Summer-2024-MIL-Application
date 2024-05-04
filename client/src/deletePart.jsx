import React, { useState } from 'react';
import './index.css'; 

function DeletePart() {
    const [sku, setSKU] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const deletePart = async (sku) => {
        try{
            const response = await fetch(`/delete/${sku}`, { method: 'DELETE' });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            setMessage(`Part with SKU ${sku} has been deleted.`);
            setSKU('');

        }
        catch (error) {
            console.error('Fetch error:', error);
            setError(`No parts were found or invalid SKU.`);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage('');  // Clear any previous success message
        setError('');    // Clear any previous error message

        if (!sku) {
            setError("Please enter a SKU.");
            return;
        }
        deletePart(sku);
    };

    return (
        <div className="inventory-list">
            <h1>Delete Part</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={sku}
                    onChange={e => setSKU(e.target.value)}
                    placeholder="Enter SKU"
                    required
                />
                <button type="submit">Delete</button>
            </form>

            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default DeletePart;

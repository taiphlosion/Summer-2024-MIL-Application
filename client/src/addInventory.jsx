import React, { useState } from 'react';

function AddInventory() {
    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState('');  
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleAddInventory = async (e) => {
        e.preventDefault();
        
        if (!sku) {
            setError('Please enter SKU');
            return;
        }
        if (!quantity) {
            setError('Please enter a quantity');
            return;
        }
        if (quantity <= 0) {
            setError('Please enter a valid quantity');
            return;
        }

        try{
            const response = await fetch(`/addInventory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sku, quantity: parseInt(quantity, 10) })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `HTTP status ${response.status}`);
            }
            setMessage(`Inventory update successful for SKU: ${data.sku} with new quantity: ${data.quantity}`);
            setError('');
            setSku('');
            setQuantity('');
        }
        catch (error) {
            setMessage('');
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Add Inventory</h2>
            <form onSubmit={handleAddInventory}>
                <label>
                    SKU:
                    <input 
                        type="text" 
                        value={sku} 
                        onChange={(e) => setSku(e.target.value)} 
                        required
                    />
                </label>

                <label>
                    Quantity:
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        required
                    />
                </label>

                <button type="submit">Add Inventory</button>
            </form>
            <div>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}

export default AddInventory;
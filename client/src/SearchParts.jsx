import React, { useState } from 'react';

function formatCharacteristics(key) {
    return key
        // Split the string at each capital letter (for camelCase)
        .split(/(?=[A-Z])/)
        // Capitalize the first letter of each word and join them with space
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function SearchParts() {
    const [searchParams, setSearchParams] = useState({
        class: '',
        resistance: '',
        tolerance: '',
        type: '',
        length: '',
        gauge: '',
        color: '',
        alphaType: '',
        betaType: '',
        speed: '',
    });

    const clearSearch = () => {
        setSearchParams({
            class: '',
            resistance: '',
            tolerance: '',
            type: '',
            length: '',
            gauge: '',
            color: '',
            alphaType: '',
            betaType: '',
            speed: '',
        });
        setResults([]);
        setError('');
    };

    
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`/search?class=${searchParams.class}&${Object.entries(searchParams).filter(([key, value]) => value && key !== 'class').map(([key, value]) => `${key}=${value}`).join('&')}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to search for parts');
            }
            setResults(data);
            setError('');
            // Reset searchParams here if you want to clear the form after each search
            setSearchParams({
                class: '',
                resistance: '',
                tolerance: '',
                type: '',
                length: '',
                gauge: '',
                color: '',
                alphaType: '',
                betaType: '',
                speed: '',
            });
        }
        catch (error){
            setError(error.message);
            setResults([]);
        }
    };

    const renderSearchFields = () => {
        switch (searchParams.class) {
            case 'Resistor':
                return (
                    <>
                        <input name="resistance" type="Number" value={searchParams.resistance} onChange={handleChange} placeholder="Resistance" />
                        <input name="tolerance" type="Number" value={searchParams.tolerance} onChange={handleChange} placeholder="Tolerance" />
                    </>
                );
            case 'Solder':
                return (
                    <>
                        <select Name="type" value={searchParams.type} onChange={handleChange}>
                            <option value="">Select Type</option>
                            <option value="lead">Lead</option>
                            <option value="lead-free">Lead-Free</option>
                            <option value="rosin-core">Rosin-Core</option>
                            <option value="acid-core">Acid-Core</option>
                        </select>
                        <input name="length" value={searchParams.length} onChange={handleChange} placeholder="Length" />
                    </>
                );
            case 'Wire':
                return(
                    <>
                        <input name="gauge" type="number" placeholder="Gauge (in)" value={searchParams.gauge} onChange={handleChange}/>
                        <input name="length" type="number" step="0.1" value={searchParams.length} onChange={handleChange} placeholder="Length (ft)"/>
                    </>
                );
            case 'Display Cable':
                return(
                    <>
                        <select Name="type" value={searchParams.type} onChange={handleChange}>
                            <option value="">Select Type</option>
                            <option value="hdmi">HDMI</option>
                            <option value="vga">VGA</option>
                            <option value="displayport">DisplayPort</option>
                            <option value="micro-hdmi">Micro HDMI</option>
                        </select>
                        <input name="length" type="number" step="0.1" value={searchParams.length} onChange={handleChange} placeholder="Length (ft)"/>
                        <input name="color" type="text" value={searchParams.color} onChange={handleChange} placeholder="Color"/>
                    </>
                );
            case 'Ethernet Cable':
                return(
                    <>
                        <select name="alphaType" value={searchParams.alphaType} onChange={handleChange}>
                            <option value="">Select Alpha Type</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <select name="betaType" value={searchParams.betaType} onChange={handleChange}>
                            <option value="">Select Beta Type</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <select name="speed" value={searchParams.speed} onChange={handleChange}>
                            <option value="">Select Speed</option>
                            <option value="10mbps">10 Mbps</option>
                            <option value="100mbps">100 Mbps</option>
                            <option value="1gbps">1 Gbps</option>
                            <option value="10gbps">10 Gbps</option>
                        </select>
                        <input name="length" value={searchParams.length} onChange={handleChange} placeholder="Length (ft)" type="number"/>
                    </>
                );
            default:
                return null;
            // Add other cases as necessary
        }
    };

    const renderResults = () => {
        if (results.length > 0) {
            return (
                <div>
                    {results.map(part => (
                        <div className="inventory-item" key={part._id}>
                            <div><strong>SKU:</strong> {part.sku}</div>
                            <div><strong>Class:</strong> {part.class}</div>
                            <div><strong>Quantity:</strong> {part.quantity}</div>
                            <div className="characteristics">
                                {Object.entries(part.characteristics).map(([key, value]) => (
                                <div key={key} className="characteristic-item">
                                    <strong>{formatCharacteristics(key)}:</strong> {typeof value === 'object' && value.$numberDecimal ? value.$numberDecimal : value}
                                </div>
                            ))}
                    </div>
                        </div>
                    ))}
                </div>
            );
        } 
        else if (error) {
            return <p>Error: {error}</p>;
        } 
        else {
            return <p>No results found.</p>;
        }
    };

    return(
        <div>
            <h2>Search Part</h2>
            <form onSubmit={handleSubmit}>
                <select name="class" value={searchParams.class} onChange={handleChange} required>
                    <option value="">Select Class</option>
                    <option value="Resistor">Resistor</option>
                    <option value="Solder">Solder</option>
                    <option value="Wire">Wire</option>
                    <option value="Display Cable">Display Cable</option>
                    <option value="Ethernet Cable">Ethernet Cable</option>
                </select>
                {renderSearchFields()}
                <button type="submit">Search Part</button>
            </form>
            {renderResults()}
        </div>
    );
}

export default SearchParts;
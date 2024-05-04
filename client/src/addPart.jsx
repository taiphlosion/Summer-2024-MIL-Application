import React, {useState} from 'react';

function AddPart(){
    const [formData, setFormData] = useState({
        sku: '',
        class: '', 
        quantity: '', 
        resistance: '',
        tolerance: '',
        gauge: '',
        length: '',
        color: '',
        alphaType: '',
        betaType: '',
        speed: '',
        type: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const characteristics = {};

        switch (formData.class) {
            case 'Resistor':
                characteristics.resistance = formData.resistance;
                characteristics.tolerance = formData.tolerance;
                break;
            case 'Solder':
                characteristics.type = formData.type;
                characteristics.length = formData.length;
                break;
            case 'Wire':
                characteristics.gauge = formData.gauge;
                characteristics.length = formData.length;
                break;
            case 'Display Cable':
                characteristics.type = formData.type;
                characteristics.length = formData.length;
                characteristics.color = formData.color;
                break;
            case 'Ethernet Cable':
                characteristics.alphaType = formData.alphaType;
                characteristics.betaType = formData.betaType;
                characteristics.speed = formData.speed;
                characteristics.length = formData.length;
                break;
            default:
                break;
        }

        const payload = {
            sku: formData.sku,
            class: formData.class,
            quantity: formData.quantity,
            characteristics: characteristics
        };

        try {
            const response = await fetch('/newpart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `HTTP status ${response.status}`);
            }
            setMessage(`Part successfuly added!`);
            setFormData({
                sku: '',
                class: '',
                quantity: '',
                resistance: '',
                tolerance: '',
                gauge: '',
                length: '',
                color: '',
                alphaType: '',
                betaType: '',
                speed: '',
                type: ''
            }); // Clear form
        } 
        catch (error) {
            setMessage(error.message);
        }
    };

    const renderSearchFields = () => {
        switch (formData.class) {
            case 'Resistor':
                return (
                    <>
                        <input name="resistance" type="Number" placeholder="Resistance" value={formData.resistance} onChange={handleChange} required />
                        <input name="tolerance" type="Number" placeholder="Tolerance" value={formData.tolerance} onChange={handleChange} required />
                    </>
                );
            case 'Solder':
                return(
                    <>
                        <select Name="type" value={formData.type} onChange={handleChange} required>
                            <option value="">Select Type</option>
                            <option value="lead">Lead</option>
                            <option value="lead-free">Lead-Free</option>
                            <option value="rosin-core">Rosin-Core</option>
                            <option value="acid-core">Acid-Core</option>
                        </select>
                        <input name="length" type="number" step="0.1" value={formData.length} onChange={handleChange} placeholder="Length (ft)" required/>
                    </>
                );
            case 'Wire':
                return(
                    <>
                        <input name="gauge" type="number" placeholder="Gauge (in)" value={formData.gauge} onChange={handleChange} required />
                        <input name="length" type="number" step="0.1" value={formData.length} onChange={handleChange} placeholder="Length (ft)" required/>
                    </>
                );
            case 'Display Cable':
                return(
                    <>
                        <select Name="type" value={formData.type} onChange={handleChange} required>
                            <option value="">Select Type</option>
                            <option value="hdmi">HDMI</option>
                            <option value="vga">VGA</option>
                            <option value="displayport">DisplayPort</option>
                            <option value="micro-hdmi">Micro HDMI</option>
                        </select>
                        <input name="length" type="number" step="0.1" value={formData.length} onChange={handleChange} placeholder="Length (ft)" required/>
                        <input name="color" type="text" value={formData.color} onChange={handleChange} placeholder="Color" required/>
                    </>
                );
            case 'Ethernet Cable':
                return(
                    <>
                        <select name="alphaType" value={formData.alphaType} onChange={handleChange} required>
                            <option value="">Select Alpha Type</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <select name="betaType" value={formData.betaType} onChange={handleChange} required>
                            <option value="">Select Beta Type</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <select name="speed" value={formData.speed} onChange={handleChange} required>
                            <option value="">Select Speed</option>
                            <option value="10mbps">10 Mbps</option>
                            <option value="100mbps">100 Mbps</option>
                            <option value="1gbps">1 Gbps</option>
                            <option value="10gbps">10 Gbps</option>
                        </select>
                        <input name="length" value={formData.length} onChange={handleChange} placeholder="Length (ft)" type="number" required/>
                    </>
                );
            default:
                return null;
        }
    };

    return(
        <div>
            <h2>Add New Part</h2>
            <form onSubmit={handleSubmit}>
                <input name="sku" type="text" placeholder="SKU" value={formData.sku} onChange={handleChange} required />
                <select name="class" value={formData.class} onChange={handleChange} required>
                    <option value="">Select Class</option>
                    <option value="Resistor">Resistor</option>
                    <option value="Solder">Solder</option>
                    <option value="Wire">Wire</option>
                    <option value="Display Cable">Display Cable</option>
                    <option value="Ethernet Cable">Ethernet Cable</option>
                </select>
                <input name="quantity" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
                {renderSearchFields()}
                <button type="submit">Add Part</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default AddPart;
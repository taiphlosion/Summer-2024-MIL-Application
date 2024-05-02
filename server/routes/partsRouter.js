const express = require('express');
const router = express.Router();
const Part = require('../models/part.js');

//Add Part
router.post('/newpart', async (req, res) => {
    try {
        const newPart = new Part(req.body); // Create a new part using the request body
        const savedPart = await newPart.save(); // Save it to the database
        res.status(201).json(savedPart); // Send back the newly created part
    } 
    catch (error) {
        if (error.name === 'ValidationError') {
            // console.log("Expected Types:", typeEnums[this.class]);            
            const messages = Object.keys(error.errors).map(key => error.errors[key].message);
            return res.status(400).json({ errors: messages });
        }
        res.status(500).json({ message: error.message });
    }
});

//Add inventory/quantity to part (SKU)
router.post('/addInventory', async (req, res) => {
    const { sku, quantity } = req.body;
    if (!sku) {
        return res.status(400).json({ message: "SKU is required" });
    }
    if (quantity < 0 || quantity == 0) {
        return res.status(400).json({ message: "Invalid quantity" });
    }
    if (!quantity || !sku) {
        return res.status(400).json({ message: "Quantity and SKU are required" });
    }
    try {
        const part = await Part.findOneAndUpdate(
            {sku: sku},
            {
                $inc: {quantity: quantity},
                $set: {updateDate: new Date().toISOString()}
            },
            {new: true}
        );
        if (!part) {
            return res.status(404).json({ message: "Part not found" });
        }
        res.status(200).json(part);
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Returns quantity of a part (SKU)
router.get('/quantity/:sku', async (req, res) => {
    const sku = req.params.sku;

    try {
        const part = await Part.findOne({sku: sku}).select('quantity -_id');
        if (part) {
            return res.status(200).json({ sku: sku, quantity: part.quantity });
        }
        else{
            return res.status(404).json({ message: "Part not found with the SKU." });
        }
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Returns all parts
router.get('/inventory', async (req, res) => {
    try {
        const parts = await Part.find({});
        if (parts.length > 0) {
            return res.status(200).json(parts);
        }
        else{
            return res.status(404).json({ message: "No parts in the inventory" });
        }
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get characteristics of a part (SKU)
router.get('/partinfo/:sku', async (req, res) => {
    const sku = req.params.sku;

    try {
        const part = await Part.findOne({sku: sku}).select('characteristics -_id');
        if (part) {
            return res.status(200).json({ sku: sku, characteristics: part.characteristics });
        }
        else{
            return res.status(404).json({ message: "Part not found with the SKU." });
        }
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Search for parts based off of characteristics
//stuff must be added to the url. For example, /search?class=Resistor&resistance=100&tolerance=5
router.get('/search', async (req, res) => {
    console.log(req.query);  // Log the incoming query parameters to debug

    try {
        const query = buildQuery(req.query);
        console.log('MongoDB Query:', query); // Log the MongoDB query to ensure it's built correctly

        const results = await Part.find(query);
        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).json({ message: "No parts found matching the criteria." });
        }
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ message: "Error processing search request" });
    }
});

//Deletes part based off of SKU
router.delete('/delete/:sku', async (req, res) => {
    const sku = req.params.sku;

    try {
        const part  = await Part.findOneAndDelete({sku: sku});
        if (part) {
            return res.status(200).json(part);
        }
        else{
            return res.status(404).json({ message: "Part not found with the SKU." });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

function buildQuery(params) {
    let query = {};
    if (params.class) {
        query['class'] = params.class;
    }
    // Add conditions for other characteristics
    for (let key in params) {
        if (params.hasOwnProperty(key) && key !== 'class' && params[key]) {
            query[`characteristics.${key}`] = params[key];
        }
    }
    return query;
}

module.exports = router;

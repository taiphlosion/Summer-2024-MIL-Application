const express = require('express');
const router = express.Router();
const Part = require('../models/part.js');

//Add Part
router.post('/new', async (req, res) => {
    try {
        const newPart = new Part(req.body); // Create a new part using the request body
        const savedPart = await newPart.save(); // Save it to the database
        res.status(201).json(savedPart); // Send back the newly created part
    } catch (error) {
        res.status(500).json({ message: error.message }); // Error handling
    }
});
// router.post('/', async (req, res) => {
//     try {
//         const { sku, class: partClass, updateDate } = req.body; // Check your body keys to match your schema
//         const newPart = new Part({
//             sku,
//             class: partClass,
//             updateDate
//         });
//         await newPart.save();
//         res.status(201).json(newPart);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


module.exports = router;

require('./db');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = 8080;

const Part = require("./models/part.js");
const partsRouter = require('./routes/partsRouter.js');

app.use(morgan('dev')); //Log requests to the console
app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.path);
    next();
});
app.use(express.json()); //Parses incoming requests with JSON payloads
app.use('/', partsRouter);

//Test Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
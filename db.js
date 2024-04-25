require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(mongoURI, options)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

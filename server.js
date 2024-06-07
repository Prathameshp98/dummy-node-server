
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const port = 8181;


app.use(express.json());
dotenv.config();

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_DATABASE_USER}:${process.env.MONGO_DATABASE_PASSWORD}@${process.env.MONGO_DATABASE_CLUSTER}/${process.env.MONGO_DATABASE_NAME}`

mongoose.connect(
    MONGODB_URI + '?retryWrites=true&w=majority'
    )
    .then(result => {
        app.listen(8282, () => {
            console.log("App started on port 8282")
        });   
    })
    .catch(err => console.log(err))


// Define a schema
const userSchema = new mongoose.Schema({
  data: Object
});

// Define a model
const Item = mongoose.model('User', userSchema);

// GET endpoint to fetch all items
app.get('/users', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

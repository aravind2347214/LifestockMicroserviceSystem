const express = require('express');
const mongoose = require('mongoose');
const Animal = require('./models/Animal'); 
const cors = require("cors")
const Health = require('./models/Health')
const Schedule = require('./models/Schedule')
// Assuming Animal is exported as default in your Animal.js file

const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors())


// MongoDB connection
mongoose.connect(`mongodb+srv://aravind:araMoNg0932@cluster0.myusfay.mongodb.net/lifestock?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
  
  // CRUD operations

  app.post('/api/animals', async (req, res) => {
    try {
      const { type, name, age, weight, healthRecord, schedule } = req.body;
  
      // Validate healthRecord and schedule IDs
      if (healthRecord && !(await Health.findById(healthRecord))) {
        return res.status(400).send({ error: 'Invalid health record ID' });
      }
      if (schedule && !(await Schedule.findById(schedule))) {
        return res.status(400).send({ error: 'Invalid schedule ID' });
      }
  
      const animal = new Animal({
        type,
        name,
        age,
        weight,
        healthRecord,
        schedule
      });
  
      await animal.save();
      res.status(201).send(animal);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });


  app.get('/api/animals', async (req, res) => {
    try {
      const animals = await Animal.find()
        .populate('healthRecord')
        .populate('schedule');
  
      res.send(animals);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  // Get a specific animal by ID with populated health records and schedules
  app.get('/api/animals/:id', async (req, res) => {
    try {
      const animal = await Animal.findById(req.params.id)
        .populate('healthRecord')
        .populate('schedule');
      if (!animal) {
        return res.status(404).send({ error: 'Animal not found' });
      }
      res.send(animal);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  // Update an animal by ID
  app.put('/api/animals/:id', async (req, res) => {
    try {
      const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true })
        // .populate('healthRecord')
        // .populate('schedule');
      if (!animal) {
        return res.status(404).send({ error: 'Animal not found' });
      }
      res.send(animal);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  // Delete an animal by ID
  app.delete('/api/animals/:id', async (req, res) => {
    try {
      const animal = await Animal.findByIdAndDelete(req.params.id);
      if (!animal) {
        return res.status(404).send({ error: 'Animal not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Animal Service running at http://localhost:${port}`);
  });
}).catch((err) => {
  console.log('Failed to connect to MongoDB', err);
});

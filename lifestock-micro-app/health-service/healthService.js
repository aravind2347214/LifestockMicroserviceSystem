// healthMonitoringService.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3002;
const  Health  = require('./Health');
const cors = require("cors")

// Middleware
app.use(express.json());
app.use(cors())

// MongoDB connection
mongoose.connect(`mongodb+srv://aravind:araMoNg0932@cluster0.myusfay.mongodb.net/lifestock?retryWrites=true&w=majority`,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
  ).then(()=>{

    // CRUD operations
    app.post('/api/health', async (req, res) => {
      const health = new Health(req.body);
      await health.save();
      res.status(201).send(health);
    });
    
    app.get('/api/health', async (req, res) => {
      const health = await Health.find();
      res.send(health);
    });
    
    app.get('/api/health/:id', async (req, res) => {
      const health = await Health.findById(req.params.id);
      res.send(health);
    });
    
    app.put('/api/health/:id', async (req, res) => {
      const health = await Health.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.send(health);
    });
    
    app.delete('/api/health/:id', async (req, res) => {
      await Health.findByIdAndDelete(req.params.id);
      res.status(204).send();
    });
    
    app.listen(port, () => {
      console.log(`Health Monitoring Service running at http://localhost:${port}`);
    });
  }).catch((err)=>{
    console.log("Error Connecting to DB",err);
  })



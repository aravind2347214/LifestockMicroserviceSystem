// feedingScheduleService.js
const express = require('express');
const mongoose = require('mongoose');
const  Schedule  = require('./Schedule');
const app = express();
const cors = require("cors")
const port = 3003;

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

  console.log("Connected To DB")

        // CRUD operations
        app.post('/api/schedules', async (req, res) => {
          const schedule = new Schedule(req.body);
          await schedule.save();
          res.status(201).send(schedule);
        });
        
        app.get('/api/schedules', async (req, res) => {
          const schedules = await Schedule.find();
          res.send(schedules);
        });
        
        app.get('/api/schedules/:id', async (req, res) => {
          const schedule = await Schedule.findById(req.params.id);
          res.send(schedule);
        });
        
        app.put('/api/schedules/:id', async (req, res) => {
          const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
          res.send(schedule);
        });
        
        app.delete('/api/schedules/:id', async (req, res) => {
          await Schedule.findByIdAndDelete(req.params.id);
          res.status(204).send();
        });
        
        app.listen(port, () => {
          console.log(`Feeding Schedule Service running at http://localhost:${port}`);
        });

}).catch((err)=>{
  console.log("Server did not start well")
})




const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
});

const Visit = mongoose.model('Visit', new mongoose.Schema({
  domain: String,
  duration: Number,
  timestamp: { type: Date, default: Date.now }
}));

app.post('/api/log', async (req, res) => {
  const { domain, duration } = req.body;
  const visit = new Visit({ domain, duration });
  await visit.save();
  res.sendStatus(200);
});

app.get('/api/report', async (req, res) => {
  const visits = await Visit.find();
  res.json(visits);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/productivity', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserData = require('./models/UserData');

app.post('/log', async (req, res) => {
  const { domain, timeSpent } = req.body;
  const record = await UserData.findOne({ domain });

  if (record) {
    record.timeSpent += timeSpent;
    await record.save();
  } else {
    await UserData.create({ domain, timeSpent });
  }

  res.sendStatus(200);
});

app.get('/stats', async (req, res) => {
  const data = await UserData.find({});
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

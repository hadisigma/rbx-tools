const express = require('express');
const cors = require('cors');
require('dotenv').config();

const webhookRoutes = require('./routes/webhook');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/webhook', webhookRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server läuft!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});
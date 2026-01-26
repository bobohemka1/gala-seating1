const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for seating data
app.get('/api/seating', (req, res) => {
  const seatingData = require('./data/seating.json');
  res.json(seatingData);
});

app.listen(PORT, () => {
  console.log(`ThePrime Gala Seating app running on port ${PORT}`);
});

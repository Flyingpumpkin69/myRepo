require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:');
    console.error(err.message); // This will give you a cleaner error message
  });

// Routes
const contactRoutes = require('./routes/contactRoutes');

app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send('Retro Portfolio Backend is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

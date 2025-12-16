const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// IMPORT ROUTES HERE 👇
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// USE ROUTES HERE 👇
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
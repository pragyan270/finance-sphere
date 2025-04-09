const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const DashRouter = require('./Routes/DashRouter');
require('dotenv').config();
require('./Models/testConnection'); 
const PORT = process.env.PORT || 8080;


app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', AuthRouter);
app.use('/dashboard', DashRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

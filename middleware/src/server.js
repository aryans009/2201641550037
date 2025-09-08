require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const EVALUATION_API_URL = process.env.EVALUATION_API_URL;
const LOG_FILE_PATH = path.join(__dirname, 'logs.json');

// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
app.post('/api/auth', async (req, res) => {
  try {
    const { email, rollNo } = req.body;
    
    const credentials = {
      email,
      rollNo,
      accessCode: process.env.ACCESS_CODE,
      clientID: process.env.API_CLIENT_ID,
      clientSecret: process.env.API_CLIENT_SECRET,
    };

    console.log('Forwarding auth request...');
    const response = await axios.post(`${EVALUATION_API_URL}/auth`, credentials);
    res.json(response.data);
  } catch (error) {
    console.error('Auth Error:', error.response ? error.response.data : error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Authentication error occurred' });
  }
});

app.post('/api/logs', async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    console.log('Forwarding log request...');
    const externalApiResponse = await axios.post(`${EVALUATION_API_URL}/logs`, req.body, {
      headers: { 'Authorization': token }
    });

    const logToStore = {
      timestamp: new Date().toISOString(),
      logData: req.body,
      apiResponse: externalApiResponse.data
    };

    let logs = [];
    try {
      const data = await fs.readFile(LOG_FILE_PATH, 'utf8');
      logs = JSON.parse(data);
    } catch (readError) {
      if (readError.code !== 'ENOENT') throw readError;
    }
    
    logs.push(logToStore);
    await fs.writeFile(LOG_FILE_PATH, JSON.stringify(logs, null, 2));
    console.log('Log successfully stored in logs.json');

    res.status(200).json(externalApiResponse.data);
  } catch (error) {
    console.error('Log Error:', error.response ? error.response.data : error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Logging error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Middleware server is running on http://localhost:${PORT}`);
});

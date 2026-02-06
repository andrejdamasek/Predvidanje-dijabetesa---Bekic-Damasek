const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

const AZURE_URL = "http://761e0046-f8d3-4485-af0d-7ff6f8b1f918.polandcentral.azurecontainer.io/score";

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

app.post('/api/score', async (req, res) => {
  console.log('Proxy → Azure:', JSON.stringify(req.body, null, 2));
  
  try {
    
    const azureRes = await fetch(AZURE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await azureRes.json();
    console.log('✅ Azure →', data);
    
    res.status(azureRes.status).json(data);
  } catch (err) {
    console.error(' Proxy error:', err);
    res.status(500).json({ error: 'Azure connection failed', details: err.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/scripts/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'scripts', 'script.js'));
});

app.listen(PORT, () => {
  console.log(` Server: http://localhost:${PORT}`);
  console.log(` Proxy API: http://localhost:${PORT}/api/score`);
});

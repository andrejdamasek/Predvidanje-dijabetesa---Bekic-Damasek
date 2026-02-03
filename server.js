const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// LOG svi requesti
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
    next();
});

// FAKE AZURE ML endpoint (test - kasnije zamijeni pravim proxy)
app.post('/api/score', (req, res) => {
    console.log('✅ POST /api/score primljen:', JSON.stringify(req.body, null, 2));
    
    // Simuliraj Azure ML response
    const prediction = Math.random() > 0.5 ? 1 : 0;
    res.json({ 
        Results: [prediction],
        message: `Model predviđa: ${prediction === 1 ? 'DIJABETES' : 'Nema'}`
    });
});

// Root stranica
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Scripts folder
app.get('/scripts/script.js', (req, res) => {
    const fileName = req.path.split('/').pop();
    res.sendFile(path.join(__dirname, 'scripts', fileName));
});

app.listen(PORT, () => {
    console.log('🚀 Server: http://localhost:' + PORT);
    console.log('📡 API: http://localhost:' + PORT + '/api/score');
    console.log('💡 FAKE Azure ML - kasnije zamijeni pravim proxy');
});

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const qs = require('qs');

const app = express();
const port = 3000;

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/exchange-token', async (req, res) => {
    const { code } = req.body;

    const clientId = '449606017712221';
    const clientSecret = 'a67c951c1e2d86a990f143f0d3bcdc26';
    const redirectUri = 'https://localhost/Project/callback.html';
    console.log('Received code:', code);
    console.log('Sending request with parameters:', {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code: code
    });

    try {
        const response = await axios.post('https://api.instagram.com/oauth/access_token', qs.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
            code: code,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }));
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
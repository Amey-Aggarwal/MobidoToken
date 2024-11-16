import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 8080;  // You can change the port if needed

// Enable CORS for all routes
app.use(cors());

// Endpoint to fetch the balance
app.get('/balance', async (req, res) => {
    const address = req.query.address;  // Get the address from the query parameters
    if (!address) {
        return res.status(400).json({ error: 'Address parameter is required' });
    }

    
    const blockScoutUrl = `https://eth-sepolia.blockscout.com/address/${address}`;
    
    try {
        // Fetch data from Blockscout
        const response = await fetch(blockScoutUrl);
        
        // Log the response status code and the response text (body)
        console.log(`Response Status: ${response.status}`);
        const text = await response.text();  // Read the raw response as text first
        console.log('Response Text:', text);
        
        if (response.status === 200) {
            // Try parsing JSON only if the response is successful (200 OK)
            const data = JSON.parse(text);  // Manually parse the text to JSON
            
            console.log('Response Data:', data);

            if (data.result) {
                // Send back the balance to the client
                res.json(data);
            } else {
                res.status(500).json({ error: 'No result in response' });
            }
        } else {
            res.status(response.status).json({ error: `Failed to fetch data: ${text}` });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data from Blockscout' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`CORS Proxy server running at http://localhost:${port}`);
});

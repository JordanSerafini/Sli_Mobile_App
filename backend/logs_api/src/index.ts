import express from 'express';
import bodyParser from 'body-parser';
import { logError } from './logger'; 

const app = express();
const port = 5050;

app.use(bodyParser.json());

app.post('/', (req, res) => {
  try {
    const error = req.body;
    if (!error.message || !error.stack) {
      return res.status(400).send('Bad Request: Missing error details');
    }
    logError(error, req); 
    res.status(200).send('Error logged');
  } catch (err) {
    console.error('Logging error:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Logging server running at http://localhost:${port}`);
});

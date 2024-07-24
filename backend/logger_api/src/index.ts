import express from 'express';
import bodyParser from 'body-parser';
import { logError } from './logger'; 

const app = express();
const port = 5050;

app.use(bodyParser.json());

app.post('/logs', (req, res) => {
  console.log(req.body);
  const { error } = req.body;
  logError(new Error(error), req);
  res.status(200).send('Error logged');
});

app.listen(port, () => {
  console.log(`Logging server running at http://localhost:${port}`);
});

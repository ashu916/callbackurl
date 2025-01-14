onst express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const postData = ''
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Callback URL endpoint
app.post('/callback', (req, res) => {
  console.log('Callback received:', req.body);
  postData = postData + req.body
  res.send('Callback received');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

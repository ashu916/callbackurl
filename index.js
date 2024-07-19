const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, 'data.json');

// Middleware to parse the body of POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like HTML)
app.use(express.static('public'));

// Handle callback URL POST requests
app.post('/callback', (req, res) => {
    const callbackData = req.body;

    // Read existing data
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) throw err;

        const dataArray = data ? JSON.parse(data) : [];
        dataArray.push(callbackData);

        // Write updated data
        fs.writeFile(dataFilePath, JSON.stringify(dataArray, null, 2), (err) => {
            if (err) throw err;

            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Callback Data</title>
                </head>
                <body>
                    <h1>Callback Data Stored</h1>
                    <a href="/">Go Back</a>
                </body>
                </html>
            `);
        });
    });
});

// Route to display stored data
app.get('/data', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) throw err;

        const dataArray = data ? JSON.parse(data) : [];

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Stored Data</title>
            </head>
            <body>
                <h1>Stored Callback Data</h1>
                <pre>${JSON.stringify(dataArray, null, 2)}</pre>
                <a href="/">Go Back</a>
            </body>
            </html>
        `);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

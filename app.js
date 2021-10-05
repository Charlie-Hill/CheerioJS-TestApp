// app.js

const http = require('http');
const cheerio = require('cheerio');
const request = require('request');

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
    // Set a response type of plain text for the response
    res.writeHead(200, {"Content-Type": "text/plaintext"});

    let retHTML = '';
    request(`https://www.google.com`, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);
            
            res.write(html)
            
        } else {
            throw new error(error)
        }
    });
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');

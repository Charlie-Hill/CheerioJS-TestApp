// app.js

const http = require('http');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs')

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
    // Set a response type of plain text for the response
    res.writeHead(200, {"Content-Type": "text/plaintext"});

    let retHTML = '';
    request(`https://twitter.com/hashtag/bids?src=hash&f=live`, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            // fs.writeFile('./output.txt', $.html(), err => {
            //     if (err) {
            //         console.error(err)
            //         return
            //     }
            // })
              


            $('li.stream-item').each(function(index){
                var name = $(this).find('.fullname').text();
                var screenname = $(this).find('span.username').text();
                var tweet = $(this).find('p.tweet-text').text();
                
                console.log('user : ' + name);   //name of the user
                console.log('screen name : ' + screenname); //screenname of user 
                console.log('tweet : ' + tweet);   //tweet content
                
                res.write(name + "\n" + tweet + "\n\n");
            });
            
            
        } else {
            throw new error(error)
        }
    });
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');

const http = require("http");
const { stringify } = require("querystring");
const PORT = process.env.PORT || 5000;
const server = http.createServer(async (req, res) => {
    //set the request route
    if (req.url === "/api/contact/" && req.method === "POST") {
        //response headers
        res.writeHead(200, { "Content-Type": "application/json" });
        // create the todo
        let data = '';
        req.on('data', chunk => {
          data += chunk;
        })
        const fs = require('fs'); 
        req.on('end', () => {
          console.log(JSON.parse(data)); 
          obj = JSON.parse(data); //now it an object
          json = JSON.stringify(obj); //convert it back to json
         fs.appendFile('contact.json', json + '\r\n', function (err) {
            if (err) throw err;
          });
        res.end();
        })

    }
    // If no route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});
server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
//OVO NE RADI - ideja je da ovo gore smesti u isti fajla koji je procitan u f2.js
/*
const fs = require('fs');   //ili // import fs from 'fs';
//write JSON string to a file
fs.writeFile('contact.json', contactArrayJSON, (err) => {
  if (err) {
    throw err;
  }
  console.log("JSON data is saved.");
});
*/
const http = require("http");
const fs = require("fs");
const createServer = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
    
      body.push(chunk);
    });
    req.on("end", () => {
      const bodyParser = Buffer.concat(body).toString();
      const message = bodyParser.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
  }
});
createServer.listen(3000);

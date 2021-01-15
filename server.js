var http = require("http");

function onRequest(request, response) {
// This is only a template.
// Should parse the URL, open the file, and return the contents.
  console.log("Request received.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

var server = http.createServer(onRequest);

server.listen(8888);

console.log("Server has started.");

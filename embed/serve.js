const finalhandler = require('finalhandler');
const http = require('http');
const serveStatic = require('serve-static');

// Serve up . folder
const serve = serveStatic('public', { index: ['index.html'] });

// Create server
const server = http.createServer(function onRequest (req, res) {
    serve(req, res, finalhandler(req, res));
})

// Listen
server.listen(8001, () => {;
    console.log("Listening on port 8001");
});

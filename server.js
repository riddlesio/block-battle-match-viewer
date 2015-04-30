var fs 			= require('fs'),
	http 		= require('http'),
	server,
	publicDir 	= './web/';

server = http.createServer(function (request, response) {

	// Serve file directly if exists
	fs.readFile([publicDir, request.url].join(''), function (error, content) {
		
		if (!error) {
			response.writeHead(200);
			response.end(content, 'utf-8');

			return;
		}

		// else serve index.html
		fs.readFile([publicDir, 'index.html'].join(''), function (error, content) {
	
			if (!error) {
				response.writeHead(200, { 'Content-Type': 'text/html' });
				response.end(content, 'utf-8');

				return;
			}

			response.writeHead(500);
			response.end();
		});
	});
}).listen(8989);
console.log("Server started 8989");

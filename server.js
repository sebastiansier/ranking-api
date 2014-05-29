var http = require('http');
var rankingBuilder = require('./ranking');

http.createServer(function (req, res) {
  var body = '';

  req.on('data', function (data) {
      body += data;
  });
  req.on('end', function () {
      POST =  JSON.parse(body);
      var ranking = new rankingBuilder.builder(POST.matches)

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(ranking.sortedTable()));
      res.end();
  });

}).listen(process.env.PORT);

console.log('Server running ...');


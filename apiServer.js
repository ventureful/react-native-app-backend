//require('./data/db.js');
const express 	 = require('express'),
	  app 		 = express(),
	  routes 	 = require('./routes/index.js'),
	  bodyParser = require('body-parser');

app.set('port', 3002);
app.use(function(req, res, next){ 
    console.log(req.method, req.url);
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:19001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	next();
});

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '250mb' }));

app.use('/api', routes);

var server = app.listen(app.get('port'), function(){
	var port = server.address().port;
	console.log('Running on port ' + port);	
});
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));

app.use(cors())

app.use('/api/wells', require('./src/apiServices/wells/Routes'))


app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);

});






require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./src/middlewares');
const routes = require('./src/routes');
const mongoConnector = require('./common/mongoConnector');
const app = express();

async function bootstrap() {
	app.use(bodyParser.json());
	app.use(middlewares);
	app.use(routes);
	app.use(function(err, req, res, next) {
		res.send({ code: 500, msg: err });
	})

	await mongoConnector.init();
	let port = process.env.PORT || 5000;
	app.listen(port, function() {
		console.log('server started on port:', port);
	})

	return app;
}


module.exports = bootstrap();

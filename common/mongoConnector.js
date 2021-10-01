const { MongoClient } = require('mongodb');
let clientConn = null, clientDb = null;

function MongoConnector({ uri }) {
	this.uri = uri;
	this.client = null;
}

MongoConnector.prototype.init = async function connect() {
	try {
		this.client = new MongoClient(this.uri);
		await this.client.connect();
	} catch (err) {
		console.log('error while connecting to mongodb', err)
		throw err;
	}
}

MongoConnector.prototype.close = async function close() {
	await this.client.close();
}

MongoConnector.prototype.getDb = function() {
	return this.client.db();
}

module.exports = new MongoConnector({ uri: process.env.MONGO_URI });
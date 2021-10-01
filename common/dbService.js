const mongoClient = require('./mongoConnector');

let execMongo = async (cmd, options) => {
	return new Promise((resole, reject) => {
		mongoClient.getDb().collection('records')[cmd](...options).toArray((err, data) => {
			if(err) { reject(err); }
			else { resole(data); }
		});
	});
}

let getRecordsWithFilter = async ({ endDate, startDate, minCount, maxCount }) => {
	let records = await execMongo('aggregate', [[
			{
		     $addFields: {
		       totalCount: { $sum: "$counts" }
		     }
		   },
			{
				$match: {
					$and: [
						{ createdAt: { $gte: new Date(startDate) } },
						{ createdAt: { $lte: new Date(endDate) } },
						{ totalCount: { $gte: minCount } },
						{ totalCount: { $lte: maxCount } }
					]
				}
			}
		]]);
	return records.map( ({ key, totalCount, createdAt }) => ({ key, totalCount, createdAt }) );
}

module.exports = {
	getRecordsWithFilter
}
const router = require('express').Router();
const dbService = require('../common/dbService');

router.post('/records/get', async function(req, res) {
	try {
		console.log('going to fetch records')
		let records = await dbService.getRecordsWithFilter(req.body);
		res.send({ code: 0, msg: "successful", records });
	} catch(err) {
		console.log('error while fetching records', err)
		res.send({ code: 500, msg: err });
	}
});

module.exports = router;
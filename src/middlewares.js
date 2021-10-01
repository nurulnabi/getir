const router = require('express').Router();
const assert = require('assert');

router.use(function inputSchemaValidation(req, res, next) {
	const { body } = req;
	try {
		assert(isValidDate(body.startDate), "Invalid startDate");
		assert(isValidDate(body.endDate), "Invalid endDate");
		assert(Number.isInteger(body.minCount), "Invalid minCount");
		assert(Number.isInteger(body.maxCount), "Invalid maxCount");
		next();
	} catch(err) {
		res.send({ code: 400, msg: err.stack });
	}
})

function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;  // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0,10) === dateString;
}

module.exports = router;
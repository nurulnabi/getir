let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

process.env.MONGO_URI = "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true";
//Our parent block
describe('Server Tests', () => {
	let server;
 	before(async function() {
 		this.timeout(190000);
		server = await require('../server');
 });

 describe('API tests', () => {

   it('it should GET records', (done) => {
	   chai.request(server)
	   .post('/records/get')
	   .send({ startDate: '2016-01-26', endDate: '2018-02-02', minCount: 100, maxCount: 200 })
	   .end((err, res) => {
	     (res).should.have.status(200);
	     (res.body).should.be.a('object');
	     (res.body.records.length).should.be.gte(1);
	     done();
	    });
   }).timeout(60000);

   it('it should fail to get records', (done) => {
	   chai.request(server)
	   .post('/records/get')
	   .send({ startDate: '2016-01-26', endDate: '2018-02-02', minCount: 2700, maxCount: "3000" })
	   .end((err, res) => {
	     (res).should.have.status(200);
	     (res.body.code).should.be.eql(400);
	     (res.body).should.be.a('object');
	     done();
	    });
   }).timeout(60000);

   it('it should GET zero records', (done) => {
	   chai.request(server)
	   .post('/records/get')
	   .send({ endDate: '2016-01-26', startDate: '2018-02-02', minCount: 100, maxCount: 200 })
	   .end((err, res) => {
	     (res).should.have.status(200);
	     (res.body).should.be.a('object');
	     (res.body.records.length).should.be.eql(0);
	     done();
	    });
   }).timeout(60000);
  });
});

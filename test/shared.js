const request = require("supertest");
const app = require("../index.js");
let token = "";

before(function(done) {
  request(app)
    .post("/user/login")
    .send({
      email: "admin@admin.com",
      password: "admin@admin.com"
    })
    .end(function(err, res) {
      token = res.body.token; // Or something
      done();
    });
});

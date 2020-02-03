const db = require("../models");
var faker = require("faker");

module.exports = {
  createNewUser(req, res) {
    const user = {
      identifier: `${faker.random.word()}${faker.random.number()}`
    };
    db.User.create(user, (err, user) => {
      if (err) {
        console.log(err);
      }
      res.json(user);
    });
  },
  getAll(req, res) {
    db.User.find({}, (err, users) => {
      res.json(users);
    });
  },
  getOneUser(req, res) {
    const { identifier } = req.params;
    db.User.findOne({ identifier }, (err, user) => {
      res.json(user);
    });
  }
};

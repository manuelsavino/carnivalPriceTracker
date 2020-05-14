const db = require("../models");
const admin = require("firebase-admin");
const serviceAccount = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://react-auth-e2ca4.firebaseio.com",
});

module.exports = {
  createNewUser(req, res) {
    const { jwt } = req.params;

    admin
      .auth()
      .verifyIdToken(jwt)
      .then(function (decodedToken) {
        let { uid, email } = decodedToken;
        const user = {
          user_id: uid,
          email,
        };
        db.User.create(user, (err, user) => {
          if (err) {
            console.log(err);
          }
          res.json(user);
        });
        console.log(decodedToken);
      })
      .catch(function (error) {
        // Handle error
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
  },
};

const router = require("express").Router();
const UserController = require("../controllers/userController");

router
  .route("/")
  .get(UserController.getAll)
  .post(UserController.createNewUser);

router.get("/:identifier", UserController.getOneUser);
module.exports = router;

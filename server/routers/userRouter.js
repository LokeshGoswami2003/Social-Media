const requireUser = require("../middlewares/requireUser");
const router = require("express").Router();
const userController = require("../controllers/userController");

router.post(
    "/follow",
    requireUser,
    userController.followOrUnfollowUserController
);
router.get(
    "/getPostsOfFollowing",
    requireUser,
    userController.getPostsOfFollowing
);
router.get("/getMyPosts", requireUser, userController.getMyPostsController);
module.exports = router;

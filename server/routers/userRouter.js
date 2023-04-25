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
router.get("/getFeedData", requireUser, userController.getPostsOfFollowing);
router.delete("/", requireUser, userController.deleteMyProfile);
router.get("/getMyInfo", requireUser, userController.getMyInfo);
router.put("/", requireUser, userController.updateUserProfile);
router.post("/getUserProfile", requireUser, userController.getUserProfile);

module.exports = router;

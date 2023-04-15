const Post = require("../models/Post");
const User = require("../models/User");
const { error, success } = require("../utils/responseWrapper");

const followOrUnfollowUserController = async (req, res) => {
    try {
        const { userIdToFollow } = req.body;
        const curUserId = req._id;

        const userToFollow = await User.findById(userIdToFollow);
        const curUser = await User.findById(curUserId);

        if (curUserId === userIdToFollow) {
            return res.send(error(409, "users cannot follow themselves"));
        }
        if (!userToFollow) {
            return res.send(error(404, "user to follow not found"));
        }

        if (curUser.followings.includes(userIdToFollow)) {
            const followingIndex = curUser.followings.indexOf(userIdToFollow);
            curUser.followings.splice(followingIndex, 1);

            const followerIndex = userToFollow.followers.indexOf(curUser);
            userToFollow.followers.splice(followerIndex, 1);

            await userToFollow.save();
            await curUser.save();
            return res.send(success(200, "user unfollowed"));
        }
        userToFollow.followers.push(curUserId);
        curUser.followings.push(userIdToFollow);

        await userToFollow.save();
        await curUser.save();

        return res.send(success(200, "user followed"));
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

const getPostsOfFollowing = async (req, res) => {
    try {
        const curUserId = req._id;
        const curUser = await User.findById(curUserId);
        const posts = await Post.find({
            owner: {
                $in: curUser.followings,
            },
        });
        return res.send(success(200, posts));
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

module.exports = {
    followOrUnfollowUserController,
    getPostsOfFollowing,
};

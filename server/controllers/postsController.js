const Post = require("../models/Post");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");
const { mapPostOutput } = require("../utils/Utils");
const cloudinary = require("cloudinary").v2;

const createPostController = async (req, res) => {
    try {
        const { caption, postImg } = req.body;
        if (!caption || !postImg) {
            return res.send(error(400, "caption and postImg are required"));
        }
        const cloudImg = await cloudinary.uploader.upload(postImg, {
            folder: "postImg",
        });

        const owner = req._id;
        const user = await User.findById(owner);
        const post = await Post.create({
            owner,
            caption,
            image: {
                publicId: cloudImg.public_id,
                url: cloudImg.url,
            },
        });
        user.posts.push(post._id);
        await user.save();

        return res.send(success(201, { post }));
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

const likeAndUnlikePost = async (req, res) => {
    try {
        const { postId } = req.body;
        const curUserId = req._id;
        const post = await Post.findById(postId).populate("owner");

        if (!post) {
            return res.send(error(404, "post not found"));
        }
        if (post.likes.includes(curUserId)) {
            const index = post.likes.indexOf(curUserId);
            post.likes.splice(index, 1);
        } else {
            post.likes.push(curUserId);
        }
        await post.save();
        return res.send(success(200, { post: mapPostOutput(post, req._id) }));
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

const updatePostController = async (req, res) => {
    try {
        const { postId, caption } = req.body;
        const curUserId = req._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.send(error(404, "post not found"));
        }

        if (post.owner.toString() !== curUserId) {
            return res.send(error(403, "only owners can update their posts"));
        }

        if (caption) {
            post.caption = caption;
        }

        await post.save();

        return res.send(success(200, { post }));
    } catch (err) {
        return res.send(500, err.message);
    }
};

const deletePostController = async (req, res) => {
    try {
        const { postId } = req.body;
        const curUserId = req._id;

        const post = await Post.findById(postId);
        const curUser = await User.findById(curUserId);
        if (!post) {
            return res.send(error(404, "post not found"));
        }

        if (post.owner.toString() !== curUserId) {
            return res.send(error(403, "only owners can delete their posts"));
        }

        const index = curUser.posts.indexOf(postId);
        curUser.posts.splice(index, 1);
        await curUser.save();
        await Post.deleteOne(post);

        return res.send(success(200, "Post deleted successfully"));
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

module.exports = {
    createPostController,
    likeAndUnlikePost,
    updatePostController,
    deletePostController,
};

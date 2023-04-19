import React from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import backgroundImg from "../../assets/pexels.jpg";
import { AiOutlineHeart } from "react-icons/ai";

function Post({ post }) {
    return (
        <div className="Post">
            <div className="heading">
                <Avatar />
                <h4>Lokesh Goswami</h4>
            </div>
            <div className="content">
                <img src={backgroundImg} alt="post" />
            </div>
            <div className="footer">
                <div className="like">
                    <AiOutlineHeart />
                    <h4>4 likes</h4>
                </div>
                <p className="caption">
                    This is nature Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Voluptate, nulla.
                </p>
                <h6 className="time-ago">4 hrs ago</h6>
            </div>
        </div>
    );
}

export default Post;

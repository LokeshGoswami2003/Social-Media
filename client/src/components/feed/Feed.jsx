import React, { useEffect } from "react";
import "./Feed.scss";
import Post from "../post/Post";
import Follower from "../follower.jsx/Follower";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../../redux/slices/feedSlice";
function Feed() {
    const dispatch = useDispatch();
    const feedData = useSelector((state) => state.feedDataReducer?.feedData);

    useEffect(() => {
        dispatch(getFeedData());
    }, [dispatch]);

    return (
        <div className="Feed">
            <div className="container">
                <div className="left-part">
                    {feedData?.posts?.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </div>
                <div className="right-part">
                    <div className="following">
                        <h3 className="title">You Are Following</h3>
                        <Follower />
                        <Follower />
                        <Follower />
                        <Follower />
                    </div>
                    <div className="suggestions">
                        <h3 className="title">Suggessted For You</h3>
                        <Follower />
                        <Follower />
                        <Follower />
                        <Follower />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feed;

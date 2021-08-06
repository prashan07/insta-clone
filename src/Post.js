import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Input, Button } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import './Post.css';
import firebase from 'firebase';
import { auth, db } from './firebase';

function Post({postId, user, username, imgUrl, caption}) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    // Extract all the comments from the database for each post
    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=> doc.data()));
            })
        }
        return() => {
            unsubscribe();
        };

    }, [postId]);

    // Add comment to our comments database
    const postComment = (event) =>{
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment("");
    }

    return (
        <div className="post">

            {/* Header */}
            <div className="post__header">
                <Avatar 
                className="post__avatar"
                alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
            </div>

            {/* Picture */}
            <img src={imgUrl} className="post__image"/>
            
            <div className="post__interact">
                <div className="like_comment">
                    <Button className="like__icon"><FavoriteBorderIcon/></Button>
                    <Button className="comment__icon"><ChatBubbleOutlineIcon/></Button>
                    
                </div>
                {/* Likes */}
                <h4><b>15,000 likes</b></h4>

                {/* Username + Caption */}
                <h4 className="post__text"><b>{username}</b> {caption}</h4>
                {/* Comments */}
                <div className="post__comments">
                    {comments.map((comment)=>(
                        <p>
                            <b>{comment.username}</b> {comment.text}
                        </p>
                    ))}
                </div>
            </div>

            {/* Comment Input */}
            { user && (
                <form className="post__commentBox">
                <Input
                    className="post__input"
                    type="text"
                    placeholder="Add a comment..."
                    value ={comment}
                    onChange = {e=> setComment(e.target.value)}
                />
                <Button
                    className="post__comment"
                    type="submit"
                    disabled ={!comment}
                    onClick={postComment}
                    variant="outlined"
                    color="primary">
                    Post
                </Button>
            </form>
            )}
            
            
        </div>
    )
}

export default Post

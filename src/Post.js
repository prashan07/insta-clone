import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Input, Button } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './Post.css';
import firebase from 'firebase';
import { auth, db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';

function Post({postId, user, username, imgUrl, caption}) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const classes = makeStyles(iconStyles)();
    const [likeCounter, setLikeCounter] = useState("0");

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

    function iconStyles() {
        return {
          successIcon: {
              fill: "#d00000"
          },
        }
    }

    const likeIncrease = ()=>{
        
        setLikeCounter("1");
    }

    const likeDecrease =()=>{
        document.getElementsByClassName(classes.successIcon).onClick = changeColor;

        function changeColor() {
            // return false;
        }   
        setLikeCounter("0");
    }
    console.log("Working");

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
                    <Button className="like__icon">
                        {likeCounter==="0" ? (
                            <FavoriteBorderIcon onClick={likeIncrease} style={{color: "black"}}/>
                        ):(
                            <FavoriteIcon onClick={likeDecrease} className={classes.successIcon}/>
                        )}
                        </Button>
                    <Button className="comment__icon" src=".post__input"><ChatBubbleOutlineIcon/></Button>
                    
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
                    variant="contained"
                    color="primary">
                    Post
                </Button>
            </form>
            )}
            
            
        </div>
    )
}

export default Post

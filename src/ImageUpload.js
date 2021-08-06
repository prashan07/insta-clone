import React, { useState, useEffect }  from 'react';
import { Button, Input } from '@material-ui/core';
import './ImageUpload.css';
import { db, storage } from './firebase';
import firebase from 'firebase';

function ImageUpload({username}) {

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    // File Picker
    const handleChange = (e) =>{
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = ()=>{

        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // Error function
                console.log(error);
            },
            () => {
                // Complete Function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });

                        setProgress(0);
                        setImage(null);
                        setCaption("");
                        console.log("Completed");
                    })
            }
        )
    };

    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100"/>
            <Input 
                type="text" 
                placeholder="What's the post about?" 
                value={caption} 
                onChange={event=> setCaption(event.target.value)}
                />
            <Input type="file" onChange={handleChange} />
            <Button variant="contained" color="primary" onClick={handleUpload}>Post</Button>
            
        </div>
    )
}

export default ImageUpload

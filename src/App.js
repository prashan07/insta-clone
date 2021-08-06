import './App.css';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import { auth, db } from './firebase';
import Modal from '@material-ui/core/Modal';
import {Button, Input} from '@material-ui/core';
import ImageUpload from './ImageUpload';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles'; 
import IconButton from '@material-ui/core/IconButton';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Chats from './Chats';
import ChatScreen from './ChatScreen';

function App() {

  // Modal Styling
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
    top: `${top}%`,
    left: `${left}%`, 
    transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    },
}));
  
  // States
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false)
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [upload, setUpload] = useState(false);
  const [user, setUser] = useState(null);

    // Firebase Authentication
    useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
          //user has logged in
          setUser(authUser);
      }else{
          //user has logged out
          setUser(null);
      }
      })
      return ()=>{
      // Perform some cleanup action after a refresh
      unsubscribe();
      }
  }, [user, username])


  // Creating User Account with Email and Password
  const signUp = (event) =>{
      event.preventDefault();

      auth.createUserWithEmailAndPassword(email, password)
      .then((authUser)=>{
      return authUser.user.updateProfile({
          displayName: username
      })
      })
      .catch((error)=> alert(error.message))

      setUsername("");
      setEmail("");
      setPassword("");
      setOpen(false);
  }
  
  
  // Extracting data from the Database
  useEffect(()=>{
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, []);

  // Signing User with Email and Password
  const signIn = (event) =>{
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password).
    catch((error)=> alert(error.message))

    setUsername("");
    setEmail("");
    setPassword("");
    setOpenSignIn(false);
}

  

  
  return (
    <div className="App">
      
      <Router>
        {/* Header */}
        <div className="app__header">

      {/*  Sign Up Modal */}
      <Modal
          open={open}
          onClose={()=> setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
              <form className="app__signup">
                  <img 
                      className="app_headerImage"
                      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"/>
                  <Input
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e)=> setUsername(e.target.value)}
                  />
                  <Input
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  />
                  <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  />

              <Button type="submit" onClick={signUp}>Sign Up</Button>
              </form>
          </div>
      </Modal>

      {/*  Sign In Modal */}
      <Modal 
          open={openSignIn} 
          onClose={()=> setOpenSignIn(false)}
      >
          <div style={modalStyle} className={classes.paper}>
              <form className="app__signup">
                  <img 
                      className="app_headerImage"
                      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"/>
                  <Input
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  />
                  <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  />
                  <Button type="submit" onClick={signIn}>Sign In</Button>
              </form>
          </div>
      </Modal>

      {/*  Upload Image Modal */}
      <Modal 
          open={upload} 
          onClose={()=> setUpload(false)}
      >
          <div style={modalStyle} className={classes.paper}>
              {user?.displayName ? (
              <ImageUpload username={user.displayName}/>  
              ):(
              <h4 className="upload_text">Login Required to Upload</h4>
              )}

          </div>
      </Modal>   

      <Link to="/">
        <img 
            className="app_headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"/>
      </Link>
      
      <Button 
          id="uploadbutton"
          variant="contained" 
          onClick={()=> setUpload(true)} 
          color="primary"
          startIcon={<PhotoCamera />}
          >Upload
      </Button>

      { user ? (
      // User is logged in
          <div className="app__loginContainer">
              <Link to="/chats">
                <IconButton>
                  <QuestionAnswerIcon/>
                </IconButton>
              </Link> 
              <Button variant="outlined" color="secondary" onClick={()=> auth.signOut()}>Log Out</Button>
               
          </div>
          ):(
          <div className="app__loginContainer">
              {/* User isn't logged in */}
              <Button variant="outlined" color="primary" onClick={()=>setOpenSignIn(true)}>Sign In</Button>
              <Button variant="outlined" color="primary" onClick={()=>setOpen(true)}>Sign Up</Button>
          </div>
          
      )} 
      </div>
      {/****************************************************************/}
      {/* End of Header */}
      {/****************************************************************/}

        <Switch>
          <Route path="/chats/:person">
            <ChatScreen/>
          </Route>
          <Route path="/chats">
              <Chats/>
          </Route>

          <Route path="/">
            {/* Posts */}
            {
              posts.map(({id, post}) => (
                <Post key={id} postId={id} user={user} username={post.username} imgUrl={post.imageUrl} caption={post.caption}/>
              ))
            }
          </Route>

          
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;

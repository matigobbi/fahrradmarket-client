import PostDetails from "./pages/PostDetails"
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';     
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';    
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';      
import { Routes, Route, Link } from "react-router-dom"; 
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from './context/auth.context' 
import './style.css'
const API_URL = "http://localhost:5005";

function App() {
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext)
  const [Posts, setPosts] = useState([])

	const getAllPosts = () => {
		axios.get(`${API_URL}/posts`)
			.then(response => {
				//  console.log(response)
				setPosts(response.data)
			})
			.catch(err => console.log(err))
	}
	useEffect(() => {
		getAllPosts()
	}, []);

  return (<>
      <Navbar/>
      <div >
        <div className="topBarHomePage bg-green">
          <Link className="linktitle" to="/"><h1 className="titleTopBar">Fahrrad Market </h1></Link>
          {isLoggedIn ? (<><p className="greeting">Hello, {user.name}</p><p>
          <button className="logOutButtonTopPage" onClick={logoutUser}>Log out</button> </p></>) : (<Link to='/login'> <button className="loginButton">LogIn</button></Link>)}
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<HomePage getAllPosts={getAllPosts} posts={Posts} user={user}/>} />
        <Route exact path="/Profile" element={<Profile posts={Posts}/>} />
        <Route exact path="/LogIn" element={<LogIn />} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/CreatePost" element={<CreatePost user={user}/>} />  
        <Route exact path="/:_id" element={<PostDetails posts={Posts} user={user}/>} />
        <Route exact path="/Profile/:_id" element={<PostDetails posts={Posts}/>} />
      </Routes>
      </>
  )
}

export default App

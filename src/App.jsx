import React, { useState, useContext, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom"; 
import { AuthContext } from './context/auth.context' 
import Conversations from './pages/Conversations';
import PostDetails from "./pages/PostDetails"
import NavBar from "./components/NavBar";
import HomePage from './pages/HomePage';     
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';    
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';      
import axios from 'axios'
import Createform from "./pages/Createform"
import './style.css'
const API_URL = "https://fahrradmarket.cyclic.app" ;
const API_URL2 = "http://localhost:5005"
function App() {
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext)
  const [Posts, setPosts] = useState([])

	const getAllPosts = () => {
		axios.get(`${API_URL2}/posts`)
			.then(response => {
				//  console.log(response)
				setPosts(response.data)
			})
			.catch(err => console.log(err))
	}
	useEffect(() => {
    console.log("executed")
    axios.get(`${API_URL2}/posts`)
    .then(response => {
      //  console.log(response)
      setPosts(response.data)
    })
    .catch(err => console.log(err))
	}, []);

  

  return (<>
      <NavBar/>
      <div >
        <div className="topBarHomePage bg-green">
          <Link className="linktitle" to="/"><h1 className="titleTopBar">Fahrrad Market </h1></Link>
          {isLoggedIn ? (<><p className="greeting">Hello, {user.name}</p><p>
          <button className="logOutButtonTopPage" onClick={logoutUser}>Log out</button> </p></>) : (<Link to='/login'> <button className="loginButton">LogIn</button></Link>)}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage getAllPosts={getAllPosts} posts={Posts} user={user}/>} />
        <Route path="/Profile" element={<Profile posts={Posts}/>} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/CreatePost" element={<CreatePost user={user}/>} /> 
        <Route path="/caroform" element={<Createform posts={Posts} user={user}/>} /> 
        <Route path="/Profile/:_id" element={<PostDetails posts={Posts}/>} />
        <Route path="Conversations" element={<Conversations />}/>
        <Route path="/:_id" element={<PostDetails posts={Posts} user={user}/>} />
      </Routes>
      </>
  )
}

export default App

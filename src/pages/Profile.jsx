import { AuthContext } from '../context/auth.context' 
import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const API_URL = "http://localhost:5005";

export default function Profile(props) {

const { user } = useContext(AuthContext)
const yourPosts = (user && props.posts.filter(function (post){return post.owner===user._id }))
const yourLikes = (user && props.posts.filter(function (post){return post.likes.find(function (like){return like===user._id}) }))
console.log(yourLikes)

const navigate = useNavigate()


const deleteProject = (key) => {
  axios.delete(`${API_URL}/posts/${key}`)
    .then(() => {
      // redirect 
      navigate('/')
    })
    .catch(err => console.log(err))
}

  return <>
  {user? (<>
  <h1 >Profile page:</h1>
  <div className="containerProfile">
    <div className="itemProfile">
      <h3>Your Information:</h3>
      <b>User Id:</b><p> {user._id }</p>
      <b>Name:</b><p> {user.name}</p>
      <b>Email:</b><p> {user.email}</p>
      <b>Country:</b><p> {user.country}</p>
      <b>Birth:</b><p> {user.birth}</p>
    </div>
    <div className="itemProfile">
      <h3>Your posts:</h3>
      <div>{yourPosts.map((post)=>(
        <>
          <p key={post._id}>{post.title}
          <button className="delete" onClick={() => deleteProject(post._id)}>Delete</button></p>
        </>
      ))}</div>
      </div>
      <div className="itemProfile">
        <h3>Your Likes:</h3>
        <div>{yourLikes.map((post)=>(
          <>
          <Link className='linksProfile' to={post._id}><p key={post._id}>{post.title}
          <span> Price <b>€ {post.price} </b></span> </p></Link>
          </>
      ))}</div>
    </div>
  </div>
  </>):(<div className="errormessage">    This page is only for Logged in users <div>¯\_(ツ)_/¯</div> </div>)
}
  </>
};
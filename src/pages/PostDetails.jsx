import React from 'react'
import { useParams, Link,useNavigate } from "react-router-dom" 
import { useEffect, useState } from "react"
import RelatedPosts from "./../components/RelatedPosts"
import axios from 'axios'
const API_URL = "https://fahrradmarket.cyclic.app";
const API_URL2 = "http://localhost:5005"

export default function Postdetails (props) {
  const [sameuser, setSameuser] = useState(undefined)
  const params = useParams()
  const navigate =useNavigate()

  const id = params._id
  // const date =  (!props.user? "" : new Intl.DateTimeFormat('en-GB', { year: 'numeric', year: "2-digit", month: '2-digit', day: '2-digit' }).format(props.user.iat))

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params]);
  
  const post= props.posts.find(post => post._id === id)
  
  function createConv() {
    if(props.user._id === post.owner) { 
      setSameuser("You cannot start a chat with yourself") 
      return
    }
    let body = [props.user._id, post.owner]
    axios.post(`${API_URL2}/conversations` , body)
    .then(res=> navigate("/conversations"))
    .catch(err=> navigate("/conversations"))
  }
  
  return <div> 
  {!post ? (<>Loading...</>) :  
  <li key= {post._id} className="containerItemDetail">
				<div className="post">
          <img className="imgPost" src={post.imageUrl}/> 
					<div className="postContent">
            <div className="containerInfo title">
              <div>
                <h1 className="postTitle">{post.title}</h1>
                <p>{!post.zipcode ? <></> : <span> Location: {post.zipcode}</span>},{post.city} </p>
              </div>
              <p className="price">{!post.price ? <></> :<span className="postPrice"> Price:  {post.price}€</span>}</p>
            </div>
            <div className="containerInfo table">
              {!post.type ? <></> :<div><h3>Type</h3><p>{post.type}</p></div>}
              {!post.framezise ? <></> :<div ><h3>Frame Size</h3><p>{post.framezise}</p></div>}
              {!post.framematerial ? <></> :<div ><h3>Frame Material</h3><p>{post.framematerial}</p></div>}
              {!post.brakes ? <></> :<div><h3>Brakes</h3><p>{post.brakes}</p></div>}
              {!post.tubes ? <></> :<div><h3>Tubes</h3><p>{post.tubes}</p></div>}
            </div>
            <div className="description">
              {!post.description ? <></> :<div><h3>Description</h3><p>{post.description}</p></div>}
              {!post.years ? <></> :<p>How old is the bike?<b> {post.years} years</b></p>}
            </div>
            <div>
            {!post.owner? <></> : 
              <div> <strong>Would you like to contact this person?</strong>
              <br/>
                <button>
                  <button onClick={createConv}> Start a conversation with the owner</button>
                </button>
                <p style={{"color":"red"}}>{sameuser && sameuser}</p>
              </div>}
            </div>
          </div>
				</div>
			</li>} 
      <RelatedPosts posts={props.posts} viewedPost={post}/>
  </div>
};

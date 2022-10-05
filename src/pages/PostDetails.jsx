import { useParams } from "react-router-dom" 
import React from 'react'
import RelatedPosts from "./../components/RelatedPosts"

export default function Postdetails (props) {
  const params = useParams()
  const id = params._id
  const date =  (!props.user? "" : new Intl.DateTimeFormat('en-GB', { year: 'numeric', year: "2-digit", month: '2-digit', day: '2-digit' }).format(props.user.iat))
  const post= props.posts.find(post => post._id === id)
  
  return <div className="bigcontainer"> 
  {!post ? (<>Loading...</>) :  
  <li key= {post._id} className="containerItemDetail">
				<div className="post">
          <img className="imgPost" src={post.imageUrl}/> 
					<div className="postContent">
            <div className="containerInfo title">
              <h1 className="postTitle">{post.title}</h1>
              <p>{!post.zipcode ? <></> : <span> Location: {post.zipcode}</span>},{post.city} </p>
              <p className="price">{!post.price ? <></> :<span className="postPrice">€ {post.price}</span>}</p>
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
              <div> <strong>If you are interested in this bike just contact me:</strong>
                <div>{post.owneremail}</div>
              </div>}
            </div>
          </div>
				</div>
			</li>} 
      <RelatedPosts posts={props.posts} viewedPost={post}/>
  </div>
};

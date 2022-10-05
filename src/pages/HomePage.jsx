import "../style.css"
import axios from 'axios'
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom"
const API_URL = "http://localhost:5005";


export default function HomePage(props) {
  const [query, setQuery] = useState("")
  const [selectQuery, setSelectQuery] =useState("")

	const handleInputChange = event => {
    setQuery(event.target.value)
    console.log(query)
	}
	const handleChange = event => {
		console.log(event)
		setSelectQuery(event.target.value)
	}

	const handlePushLike = (postId) => {
		const foundedPost = props.posts.find(post => post._id === postId)
		props.user && foundedPost.likes.push(`${props.user._id}`)
		const requestBody= foundedPost.likes
		axios.put(`${API_URL}/${postId}/addlike`, requestBody)
		props.getAllPosts()
	}


	const postsReversed = [...props.posts.slice().reverse()]

	const filtered = postsReversed
															   .filter(posts => {
																		if (selectQuery=="-99"){ return posts.price < "99"}
																		if (selectQuery=="100 - 199"){ return posts.price > "100" && posts.price < "199"}
																		if (selectQuery=="200 - 399"){ return posts.price > "200" && posts.price < "399"}
																		if (selectQuery=="+400"){ return posts.price > "400"}
																		if (selectQuery=="Steel"){return posts.framematerial.includes("steel")}
																		if (selectQuery=="Aluminum"){return posts.framematerial.includes("aluminum")}
																		if (selectQuery=="Carbon"){return posts.framematerial.includes("carbon") || posts.framematerial.includes("tita")}
																		if (selectQuery=="all") {return posts}
																		else {return posts}
})
																.filter(posts => {
																		return posts.title.toLowerCase().includes(query.toLowerCase())
});    

    return (<>    
		<input className="search-field" type="search" placeholder="Search..." onChange={handleInputChange}/>
		<div>
			<button className="searchButtons" value="all" onClick={handleChange}>All</button>
			<button className="searchButtons" value="-99" onClick={handleChange}>-99€</button>
			<button className="searchButtons" value="100 - 199" onClick={handleChange}>100€ - 199€</button>
			<button className="searchButtons" value="200 - 399" onClick={handleChange}>200€ - 399€</button>
			<button className="searchButtons" value="+400" onClick={handleChange}>+400€</button>
		</div>
		<div>
			<button className="searchButtons" value="Steel" onClick={handleChange}> Steel</button>
			<button className="searchButtons" value="Aluminum" onClick={handleChange}> Aluminum</button>
			<button className="searchButtons" value="Carbon" onClick={handleChange}> Carbon // Titanium</button>
		</div>

      {!props.posts ? (<>Loading...</>) : 
		(<div className="postCards"> {filtered.map((post)=>(
			<li key= {post._id} className='postItem'>
				<div className="post">
				<Link to={post._id}> <img className="imgPost" src={post.imageUrl}/> </Link>
					<div className="postContent">
						<p className="postTitle">{post.title}</p>
						<p className="postAdress"> {post.zipcode}, {post.city}</p>
						<div className="pricenAndLike">
							<p className="postPrice">€ {post.price}</p>
							{!props.user? <></> : <button className="likeButton" onClick={() => {handlePushLike(post._id)}}> {post.likes.includes(props.user._id) ? <p >Liked</p> : <p>❤</p>} </button>}
						</div>
					</div>
				</div>
			</li>
		))} 
		</div>
		)} 
    </>)
		
};

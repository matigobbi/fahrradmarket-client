
import React from "react"
import { Link, Navigate } from "react-router-dom"


function RelatedPosts ({posts, viewedPost}) {


 let related = posts.filter(onePost=> {return onePost.price < (viewedPost.price +100) && onePost.price > (viewedPost.price -100) && onePost._id != viewedPost._id})
 let selectedRelated = related.slice(0,5)
//  console.log(selectedRelated)
  return <div>
	<p>Don´t you like this one? We have a selection of similar range price for you.</p> 
		<div className='relatedPostItem'> 
		{selectedRelated.map(oneRelated => (
			<div key= {oneRelated._id} >
					<div className="post related">
					<Link to={`/${oneRelated._id}`}> <img className="imgPost" src={oneRelated.imageUrl}/> </Link>
						<div className="postContent related">
							<p className="postTitle">{oneRelated.title}</p>
							<p className="postAdress"> {oneRelated.zipcode}, {oneRelated.city}</p>
							<div className="pricenAndLike">
								<p className="postPrice">€ {oneRelated.price}</p>
							</div>
						</div>
					</div>
				</div>
		))}
		</div>
	</div>

};

export default RelatedPosts;
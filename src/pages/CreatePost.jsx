import { AuthContext } from '../context/auth.context' 
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


 
// import the service file since we need it to send (and get) the data to(from) the server
import service from "../service";
 
function CreatePost (props){
  const navigate = useNavigate()
  const owner = (props.user? props.user._id : "")
  const owneremail = (props.user? props.user.email : "")
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [type, setType] = useState("");
  const [framesize, setFramesize] = useState("");
  const [framematerial, setFramematerial] = useState("");
  const [brakes, setBrakes] = useState("");
  const [tubes, setTubes] = useState("");
  const [years, setYears] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("Berlin");
 
  const handleFileUpload = e => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
 
    service
      .uploadImage(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "secure_url" which we can use to update the state
        setImageUrl(response.secure_url);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };
  const handleSubmit = e => {
    e.preventDefault();
 
    service
      .createPost({ owner,owneremail, title, price, description, imageUrl, type, framesize, framematerial, brakes, tubes, years, zipcode, city })
      .then(res => {
        // console.log("added new movie: ", res);
        // Reset the form
        setTitle("");
        setPrice("");
        setDescription("");
        setImageUrl("");
        setType("");
        setFramesize("");
        setFramematerial("");
        setBrakes("");
        setTubes("");
        setYears("");
        setZipcode("");
        setCity("Berlin");
        navigate('/') 
      })
      .catch(err => console.log("Error while adding the new movie: ", err));
  };
  
 
  return ( <>{props.user? (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <b>Title *</b>
        <input type="text" name="title" value={title} 
          onChange={(e) => setTitle(e.target.value)}/>
        <b>Price *</b>
        <input type="number" min="0.00" max="10000.00" step="5" name="price" value={price} 
          onChange={(e) => setPrice(e.target.value)}/>

        <b htmlFor="type">Type of bike:</b>

        <select id="type" name="type" value={type} 
          onChange={(e) => setType(e.target.value)}>
        <option value="city">City Bike</option>
        <option value="road">Road Bike</option>
        <option value="singlespeed">Single Speed/FixedGear</option>
        <option value="mtb">Mountain Bike</option>
        <option value="folding">Folding Bike</option>
        <option value="bmx">BMX</option>
        </select>
          
        <b>Frame Size</b>
        <select id="framesize" name="framesize" value={framesize} 
          onChange={(e) => setFramesize(e.target.value)}>
        <option value="-38">-38cms (xxs)</option>
        <option value="38-40">38 - 40cms (xxs)</option>
        <option value="40-42">40 - 42cms (xxs)</option>
        <option value="42-44">42 - 44cms (xxs)</option>
        <option value="44-46">44 - 46cms (xs)</option>
        <option value="46-48">46 - 48cms (S)</option>
        <option value="46-48">48 - 50cms (S)</option>
        <option value="48-50">50 - 52cms (M)</option>
        <option value="50-52">52 - 54cms (M)</option>
        <option value="52-54">54 - 56cms (M)</option>
        <option value="54-56">56 - 58cms (L)</option>
        <option value="56-58">58 - 60cms (L)</option>
        <option value="+60">+60cms (XL)</option>
        </select>

        <b>Frame Material</b>
        <select type="text" name="framematerial" value={framematerial} 
          onChange={(e) => setFramematerial(e.target.value)}>
        <option value="steel">Steel </option>
        <option value="aluminum">Aluminum</option>
        <option value="carbon">Carbon</option>
        <option value="titanium/magnesium">Titanum/magnesium</option>
        </select>      
        <div className='formAgrup'>
          <b>Brakes
            <input type="text" name="brakes" value={brakes} 
              onChange={(e) => setBrakes(e.target.value)}/>
          </b>
          <b>Tubes
            <input type="tubes" name="tubes" value={tubes} 
              onChange={(e) => setTubes(e.target.value)}/>
          </b>
          <b>Years Old
            <input type="years" name="years" value={years} 
              onChange={(e) => setYears(e.target.value)}/>
          </b>
          <b>Zip Code
          <input type="zipcode" name="zipcode" value={zipcode} 
            onChange={(e) => setZipcode(e.target.value)}/>
          </b>
          <b>City
          <input type="city" name="city" value={city} 
            onChange={(e) => setCity(e.target.value)}/>   
          </b>
        </div>
        <b>Description *</b>
        <textarea type="text" name="description" value={description}
          onChange={(e) => setDescription(e.target.value)} />

        <b>Upload a file *</b>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        {/* <input type="file" onChange={(e) => handleFileUpload(e)} />
        <input type="file" onChange={(e) => handleFileUpload(e)} /> */}
 
        <button type="submit"><b>Create new Post</b></button>
      </form>
    </div>) : (<div className="errormessage"> This page is only for Logged in users <div>¯\_(ツ)_/¯</div> </div>)}
    </>
  );
}
 
export default CreatePost;
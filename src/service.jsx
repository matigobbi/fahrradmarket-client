import axios from "axios";
 
const service = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005"
});
 
const errorHandler = err => {
  throw err;
};
 
const getPosts = () => {
  return service
    .get("/posts")
    .then((res) => res.data)
    .catch(errorHandler);
};
 
const uploadImage = (file) => {
  return service
    .post("/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};
 
const createPost = (newPost) => {
  return service
    .post("/posts", newPost)
    .then(res => res.data)
    .catch(errorHandler);
};
 
export default {
  service,
  getPosts,
  uploadImage,
  createPost,
};
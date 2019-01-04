import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';

class NewPost extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      author: 'Max'
    };
    this.pRef = React.createRef();
  }

addNewPost = () => {   
  const newPost = {
    title: this.state.title,
    body: this.state.content,
    author: this.state.author,
  }  
  axios({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/posts',
    data: newPost,   
    onUploadProgress: (progressEvent) => {
      this.pRef.current.innerHTML = "Uploading post...";      
    },
  }).then(response => {
    this.pRef.current.innerHTML = "Post uploaded!";  
    this.setState({
      title: '',
      content: '',
      author: 'Max'
    })    
    
  })
}

render () { 
   
  return (
    <div className="NewPost">
        <h1 ref={this.pRef}>Add a Post</h1>      
        <label>Title</label>
        <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
        <label>Content</label>
        <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
        <label>Author</label>
        <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.addNewPost}>Add Post</button>
    </div>
  );
  
}
}

export default NewPost;
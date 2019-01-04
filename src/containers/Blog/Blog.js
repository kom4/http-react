import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

  state = {
    posts: [], 
    selectedPostId: null
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {...post, author: 'Max'}
        })
        this.setState({posts: updatedPosts})
      })
  }

  postClicked = (id) => {
    this.setState({selectedPostId: id});    
  }

  postDeleteHandler = () => {
    axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.state.selectedPostId)
    .then(response => {      
      if(response.status === 200){
        const posts = this.state.posts;
        const inArrayId = posts.findIndex((post) => {
          return post.id === this.state.selectedPostId;
        })       
        posts.splice(inArrayId, 1);        
        this.setState({
          posts: posts,
          t
        });                   
      }      
    })
  }

    render () {                                                
      
      const posts = this.state.posts.map(post => {
        return <Post key={post.id} title={post.title} author={post.author} postClicked={() => this.postClicked(post.id)}/>
      })

        return (
            <div>
                <section className="Posts">
                  {posts}
                </section>
                <section>
                  <FullPost id={this.state.selectedPostId} postDeleted={this.postDeleteHandler}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

  state = {
    posts: [],
    fullPost: null
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
    const posts = this.state.posts;
    const clickedPostId = posts.findIndex((post) => {
      return post.id === id;
    })
    const clickedPost = posts[clickedPostId];        
    this.setState({
      fullPost : clickedPost
    })    
  }

    render () {
      
      const fullPost = this.state.fullPost !== null ? <FullPost title={this.state.fullPost.title} 
                                                           author={this.state.fullPost.author} /> : <FullPost />
      
      const posts = this.state.posts.map(post => {
        return <Post key={post.id} title={post.title} author={post.author} postClicked={() => this.postClicked(post.id)}/>
      })

        return (
            <div>
                <section className="Posts">
                  {posts}
                </section>
                <section>
                  {fullPost}
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
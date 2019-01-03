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

    // const posts = this.state.posts;
    // const clickedPostId = posts.findIndex((post) => {
    //   return post.id === id;
    // })
    // const clickedPost = posts[clickedPostId];        
    // this.setState({
    //   fullPost : clickedPost
    // })       
  }

  postDeleteHandler = () => {
    const posts = this.state.posts;
    const currentPost = this.state.fullPost;
    const currentPostId = posts.findIndex((post) => {
      return post.id === currentPost.id;
    })
    posts.splice(currentPostId, 1);
    this.setState({
      posts: posts,
      fullPost: null,
    })
  }

  addNewPost = (title, content, author) => {   
    const newPost = {
      title: title,
      body: content,
      author: author,
      id: new Date().getTime(),
    }  
    const posts = this.state.posts;
    posts.push(newPost);
    this.setState({posts: posts})    
  }

    render () {
     
      // const fullPost = this.state.fullPost !== null ? <FullPost title={this.state.fullPost.title} 
      //                                                           author={this.state.fullPost.author} 
      //                                                           content={this.state.fullPost.body} 
      //                                                           postDeleted={this.postDeleteHandler}
      //                                                           /> : <FullPost />
      
      const posts = this.state.posts.map(post => {
        return <Post key={post.id} title={post.title} author={post.author} postClicked={() => this.postClicked(post.id)}/>
      })

        return (
            <div>
                <section className="Posts">
                  {posts}
                </section>
                <section>
                  <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost addNewPost={this.addNewPost}/>
                </section>
            </div>
        );
    }
}

export default Blog;
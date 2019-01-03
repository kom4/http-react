import React from 'react';

import './Post.css';

class Post extends React.Component {

    render () {

        return (
            <article className="Post" onClick={this.props.postClicked}>
            <h1>{this.props.title}</h1>
            <div className="Info">
                <div className="Author">{this.props.author}</div>
            </div>
        </article>

        )
    }

}

export default Post;
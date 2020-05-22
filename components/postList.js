import React, { Component } from "react";
import { Link } from "react-router-dom";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.createMarkup = this.createMarkup.bind();
  }

  componentDidMount() {

    fetch("https://keroken.com/och/wp/wp-json/wp/v2/posts")
    .then((response) => {
      if (response.ok === true) {
        console.log("Success!");
      } else {
        throw new Error();
      }
      
      return response.json();
    })
    .then((posts) => {
      console.log(posts);
      this.setState({
        posts: posts
      });
    })
    .catch(error => console.error('Error:', error));

  }

  createMarkup(html) {
    return { __html: html };
  }

  render() {
    return (
      <div>
        {this.state.posts.map(post => (
          <Link to={`/${post.slug}`} key={post.id}>
            <div className="card" key={post.id}>
              <div className="card-content">
                <h3>{post.title.rendered}</h3>
                {/* <div dangerouslySetInnerHTML={this.createMarkup( post.excerpt.rendered )} /> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default PostList;
import React, { Component } from "react";

class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      post: {},
      comments: [],
      input: {
        author: this.props.author,
        email: this.props.email,
        content: this.props.content,
        id: this.props.id
      }
    };
    this.createMarkup = this.createMarkup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    console.log(this.props);

    fetch(`https://keroken.com/och/wp/wp-json/wp/v2/posts?slug=${slug}`)
      .then((response) => {
        if (response.ok === true) {
          console.log("Success!");
        } else {
          throw new Error();
        }

        return response.json();
      })
      .then((post) => {
        this.setState({
          id: post[0].id,
          post: post[0],
        });
        console.log(this.state);

        fetch(`https://keroken.com/och/wp/wp-json/wp/v2/comments?post=${this.state.post.id}`)
          .then((response) => {
            if (response.ok === true) {
              console.log("Success!");
            } else {
              throw new Error();
            }
            
            return response.json();
          })
          .then((data) => {
            console.log(data);
            this.setState({
              comments: data.reverse()
            });
          })
          .catch(error => console.error('Error:', error));
      })
      .catch(error => console.error('Error:', error));
  }

  createMarkup(html) {
    return { __html: html };
  }

  handleChange(e) {
    this.setState(
      {input: 
        {
          author: e.target.value.author,
          email: e.target.value.email,
          content: e.target.value.content,
          id: e.target.value.id
        }
      });
  }

  handleSubmit(e) {
    event.preventDefault();
    console.log(e.target.elements);
    const [postId, name, email, comment] = e.target.elements;
    const data = JSON.stringify({
      post: postId.value,
      author_name: name.value,
      author_email: email.value,
      content: comment.value
    });

    fetch("https://keroken.com/och/wp/wp-json/wp/v2/comments", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((response) => {
        if (response.ok === true) {
          // Submitted successfully!
        }

        fetch(`https://keroken.com/och/wp/wp-json/wp/v2/comments?post=${this.state.post.id}`)
          .then((response) => {
            if (response.ok === true) {
              console.log("Success!");
            } else {
              throw new Error();
            }
            
            return response.json();
          })
          .then((data) => {
            console.log(data);
            this.setState({
              comments: data.reverse(),
              input: {
                author: '',
                content: '',
                email: '',
                id: 0
              }
            });
          })
          .catch(error => console.error('Error:', error));
      })
      .then((object) => {
        if(object) {console.log(object.message);}
        // Comment submission failed.
        // Output `object.message` to see the error message.
      })
      .catch(error => console.error('Error:', error));

  }

  render() {
    let build;
    if (this.state.post.title) {
      build = (
        <div>
          <h1>{this.state.post.title.rendered}</h1>
          <div dangerouslySetInnerHTML={this.createMarkup( this.state.post.content.rendered )} />
          <div>
            {this.state.comments.map(comment => (
              <div className="card" key={comment.id}>
                <div className="card-content">
                  <div dangerouslySetInnerHTML={this.createMarkup( comment.content.rendered )} />
                  <span>name: {comment.author_name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="comment-form">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <div className="control">
                  <input type="hidden" id="postId" value={this.state.id} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input className="input" type="text" placeholder="author" value={this.state.input.author} id="name" onChange={this.handleChange} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input className="input" type="text" placeholder="email" value={this.state.input.email} id="email" onChange={this.handleChange} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <textarea className="textarea" type="text" placeholder="comment" value={this.state.input.content} id="comment" onChange={this.handleChange} />
                </div>
              </div>
              <div className="control">
                <input className="button is-primary" type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      build = (
        <div>
          <p>could not find article</p>
        </div>
      );
    }
    return build;
  }
}

export default PostView;
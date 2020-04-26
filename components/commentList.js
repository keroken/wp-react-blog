import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      input: ''
    };
    this.createMarkup = this.createMarkup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("https://keroken.com/och/wp/wp-json/wp/v2/comments").then(comments => {
      this.setState({
        comments: comments.data
      });
      console.log(comments.data);
    });
  }

  createMarkup(html) {
    return { __html: html };
  }

  handleChange(e) {
    this.setState({input: e.target.value});
  }

  handleSubmit(e) {
    event.preventDefault();
    axios.post("https://keroken.com/och/wp/wp-json/wp/v2/comments?content=${e.target.value}")
      .then(data => {
        console.log(e.target.value)
      }
      );
    this.setState({input: ''});
  }

  render() {
    return (
      <div>
        {this.state.comments.map(comment => (
            <div className="card" key={comment.id}>
              <div className="card-content">
                <h3>{comment.author_name.rendered}</h3>
                <div dangerouslySetInnerHTML={this.createMarkup( comment.content.rendered )} />
              </div>
            </div>
        ))}
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.input} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default CommentList;
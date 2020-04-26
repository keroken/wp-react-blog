import React, { Component } from 'react';

export default class Movies extends Component {
  
  constructor(props) {
    super(props);
    this.state = { data: {} };
  
    this.fetchPostData = this.fetchPostData.bind(this);
    this.renderMovies = this.renderMovies.bind(this);
    this.populatePageAfterFetch = this.populatePageAfterFetch.bind(this);
    
  }

  componentDidMount() {
    this.fetchPostData();
  }

  fetchPostData() {
    fetch(`https://keroken/och/wp/wp-json/wp/v2/posts`)
      .then(response => response.json())
      .then(myJSON => {
        let objLength = Object.keys(myJSON).length;
        let newState = this.state;
      
        for (let i = 0; i < objLength; i++) {
          let objKey = Object.values(myJSON)[i].title.rendered;
          let currentMovie = newState.data[objKey];
          
          currentMovie = {};
          currentMovie.name = Object.values(myJSON)[i].title.rendered;
          currentMovie.description = Object.values(myJSON)[i].content.rendered;
          currentMovie.featured_image = Object.values(myJSON)[i]['featured_image_url'];
          currentMovie.genre = Object.values(myJSON)[i]['genre'];          
        }
      
      this.setState(newState);
      });
  }
  
  renderMovies() {
    if (this.state.data) {
      const moviesArray = Object.values(this.state.data)
      return Object.values(moviesArray).map((movie, index) => this.populatePageAfterFetch(movie, index));
    }
  }

  populatePageAfterFetch(movie, index) {
    if (this.state.data) {

      return (
        <div key={index} index={index}> 
          <h2 className="name">{movie.name}</h2> 
          <h3 className="genre">{movie.genre}</h3>
          <div className="description" dangerouslySetInnerHTML={{__html: movie.description}} />
          <img className="featured_image" src={movie.featured_image} alt={movie.name} />
        </div>
      )
    }
  }

  render() {
      return (
      <>
        <h1>Movies</h1>
        <div>{this.renderMovies()}</div>
      </>
      )
  }
}
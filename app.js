import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Header from "./components/header";
import PostList from "./components/postList";
import PostView from "./components/postView";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <section className="section container content">
            <Switch>
              <Route exact path="/" component={PostList} />
              <Route path="/:slug" component={PostView} />
            </Switch>
          </section>
        </div> 
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

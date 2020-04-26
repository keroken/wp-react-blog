import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Header from "./components/header";
import PostList from "./components/postList";
import PostView from "./components/postView";
import CommentList from "./components/commentList";

const App = () => (
  <Router>
    <div>
      <Header />
      <section className="section container content">
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/comments/" component={CommentList} />
          <Route path="/:slug" component={PostView} />
        </Switch>
      </section>
    </div> 
  </Router>
  
);

ReactDOM.render(<App />, document.getElementById("app"));

import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <nav className="navbar is-primary">
    <div className="container has-text-centered">
      <div className="navbar-brand">
        <p className="is-size-3">
          <Link to="/" className="has-text-white">
            Wordpress + React
          </Link>
        </p>
      </div>
      <nav>
        <ul>
          <li><Link to="/comments/" className="has-text-white is-size-4">Comments</Link></li>
        </ul>
      </nav>
    </div>
  </nav>
);

export default Header;

import React from "react";
import {Link} from "react-router-dom";

const NotFound = () => (
  <main className="page__main" style={{fontFamily: `rubik,arial,sans-serif`}}>
    <h1 style={{
      textAlign: `center`,
      marginTop: `10%`
    }}>Page not found</h1>
    <Link to="/" style={{
      textAlign: `center`,
      display: `block`,
      textDecoration: `underline`
    }}>To main page</Link>
  </main>
);

export default NotFound;

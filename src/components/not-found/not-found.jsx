import React from "react";
import {Link} from "react-router-dom";

const NotFound = () => (
  <main className="page__main page__main--not-found">
    <h1 className="page__not-found-title">Page not found</h1>
    <Link className="page__not-found-link" to="/">To main page</Link>
  </main>
);

export default NotFound;

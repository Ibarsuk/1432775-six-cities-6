import React from "react";
import {Link} from "react-router-dom";

import {Routes} from '../../const';

import Header from '../header/header';
import Footer from '../footer/footer';

const NotFound = () => (
  <div className="page page--gray">
    <Header/>
    <main className="page__main page__main--not-found">
      <h1 className="page__not-found-title">Page not found</h1>
      <Link className="page__not-found-link" to={Routes.ROOT}>To main page</Link>
    </main>
    <Footer/>
  </div>
);

export default NotFound;

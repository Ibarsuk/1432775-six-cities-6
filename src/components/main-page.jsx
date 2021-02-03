import React from "react";
import CitiesMenu from './cities-menu';
import City from './city';

const MainPage = () => (
  <main className="page__main page__main--index">
    <h1 className="visually-hidden">Cities</h1>
    <CitiesMenu/>
    <City/>
  </main>
);

export default MainPage;

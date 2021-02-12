import React from "react";
import {NavLink} from "react-router-dom";

import {cities} from '../../const';

const CitiesMenu = () => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.keys(cities).map((city, i) => (
          <React.Fragment key={city + i}>
            <li className="locations__item">
              <NavLink activeClassName="tabs__item--active" className="locations__item-link tabs__item" href="#" to={`/cities/${cities[city]}`}>
                <span>{city}</span>
              </NavLink>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </section>
  </div>
);

export default CitiesMenu;

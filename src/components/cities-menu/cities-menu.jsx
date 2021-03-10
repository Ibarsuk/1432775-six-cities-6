import React from "react";
import {NavLink} from "react-router-dom";

import {useDispatch} from "react-redux";

import {changeCity} from '../../store/action-creators';
import {cities, Routes} from '../../const';

const CitiesMenu = () => {
  const dispatch = useDispatch();
  const handleLinkClick = (city) => {
    dispatch(changeCity(city));
  };
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.keys(cities).map((city, i) => (
            <li className="locations__item" key={city + i}>
              <NavLink onClick={() => handleLinkClick(cities[city])} activeClassName="tabs__item--active" className="locations__item-link tabs__item" href="#" to={`${Routes.CITIES}/${cities[city]}`}>
                <span>{city}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CitiesMenu;

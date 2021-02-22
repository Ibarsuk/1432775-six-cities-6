import React from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import ActionCreator from '../../store/action-creator';
import {cities} from '../../const';

const CitiesMenu = (props) => {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.keys(cities).map((city, i) => (
            <React.Fragment key={city + i}>
              <li className="locations__item">
                <NavLink onClick={() => props.onLinkClick(cities[city])} activeClassName="tabs__item--active" className="locations__item-link tabs__item" href="#" to={`/cities/${cities[city]}`}>
                  <span>{city}</span>
                </NavLink>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </section>
    </div>
  );
};

CitiesMenu.propTypes = {
  onLinkClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onLinkClick(city) {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {CitiesMenu};
export default connect(null, mapDispatchToProps)(CitiesMenu);

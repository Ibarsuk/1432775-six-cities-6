import React, {useEffect} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import {fetchOffers} from '../store/api-actions';
import {offerPropTypes} from '../components/prop-types';

import Loading from '../components/loading/loading';

const withOffersFetch = (Component) => {

  const WithOffersFetch = ({onOffersLoad, areOffersLoaded, ...restProps}) => {
    useEffect(() => {
      if (!areOffersLoaded) {
        onOffersLoad();
      }
    }, [areOffersLoaded]);

    if (!areOffersLoaded) {
      return <Loading/>;
    }
    return <Component {...restProps}/>;
  };

  WithOffersFetch.propTypes = {
    areOffersLoaded: PropTypes.bool.isRequired,
    onOffersLoad: PropTypes.func.isRequired,
    offers: PropTypes.arrayOf(PropTypes.shape(offerPropTypes)).isRequired
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithOffersFetch);
};

const mapStateToProps = (state) => ({
  areOffersLoaded: state.areOffersLoaded,
  offers: state.offers
});

const mapDispatchToProps = (dispatch) => ({
  onOffersLoad() {
    dispatch(fetchOffers());
  }
});

export default withOffersFetch;

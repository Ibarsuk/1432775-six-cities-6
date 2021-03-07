import React, {useEffect} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import ActionCreator from '../store/action-creator';

const withMapRelatedList = (Component) => {
  const WithMapRelatedList = ({onMapUnmount, activeOfferId, onActiveOfferChange, ...restProps}) => {

    useEffect(() => {
      return onMapUnmount;
    }, []);

    const handleOfferCardMouseOver = (offerId) => {
      if (activeOfferId === offerId) {
        return;
      }
      onActiveOfferChange(offerId);
    };

    return <Component {...restProps} onOfferCardMouseOver={handleOfferCardMouseOver}/>;
  };

  WithMapRelatedList.propTypes = {
    onActiveOfferChange: PropTypes.func.isRequired,
    onMapUnmount: PropTypes.func.isRequired,
    activeOfferId: PropTypes.number
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithMapRelatedList);
};

const mapStateToProps = (state) => ({
  activeOfferId: state.activeOfferId
});

const mapDispatchToProps = (dispatch) => ({
  onActiveOfferChange(activeOfferId) {
    dispatch(ActionCreator.updateActiveOffer(activeOfferId));
  },
  onMapUnmount() {
    dispatch(ActionCreator.updateActiveOffer(null));
  }
});

export default withMapRelatedList;

import {useState} from "react";

import {fetchNearOffers as nearOffersLoader} from "../store/api-actions";

export const useNearOffers = () => {
  const [nearOffers, setNearOffers] = useState([]);

  const fetchNearOffers = (offerID) =>
    nearOffersLoader(offerID)
    .then((newNearOffers) => setNearOffers(newNearOffers));

  return {
    nearOffers,
    setNearOffers,
    fetchNearOffers
  };
};

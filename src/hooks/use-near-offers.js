import {useEffect, useState} from "react";

import {fetchNearOffers} from "../store/api-actions";

export const useNearOffers = (offerID) => {
  const [nearOffer, setNearOffers] = useState(null);

  useEffect(() => {
    fetchNearOffers(offerID)
      .then((newNearOffers) => setNearOffers(newNearOffers));
  }, [offerID]);

  return [nearOffer, setNearOffers];
};

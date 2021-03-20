import {useState} from "react";
import {useHistory} from "react-router";

import {Routes, StatusCode} from "../const";
import {fetchOffer as offerLoader} from "../store/api-actions";

export const useOffer = () => {
  const [offer, setOffer] = useState(null);

  const history = useHistory();

  const fetchOffer = (offerID) =>
    offerLoader(offerID)
    .then((newOffer) => setOffer(newOffer))
    .catch((err) => {
      if (err.response.status === StatusCode.NOT_FOUND) {
        history.push(Routes.NOT_FOUND);
      }
    });

  return {
    offer,
    setOffer,
    fetchOffer
  };
};

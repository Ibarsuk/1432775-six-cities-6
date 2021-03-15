import {useEffect, useState} from "react";
import {useHistory} from "react-router";

import {Routes, StatusCode} from "../const";
import {fetchOffer} from "../store/api-actions";

export const useOffer = (offerID) => {
  const [offer, setOffer] = useState(null);

  const history = useHistory();

  useEffect(() => {
    fetchOffer(offerID)
      .then((newOffer) => setOffer(newOffer))
      .catch((err) => {
        if (err.response.status === StatusCode.NOT_FOUND) {
          history.push(Routes.NOT_FOUND);
        }
      });
  }, [offerID]);

  return [offer, setOffer];
};

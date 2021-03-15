import {ONE_STAR_PERCENT} from './const';

export const getStarsWidth = (rating) => `${rating * ONE_STAR_PERCENT}%`;

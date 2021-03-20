import {ONE_STAR_PERCENT, months} from './const';

export const getStarsWidth = (rating) => `${rating * ONE_STAR_PERCENT}%`;

export const getFormattedDate = (date) => `${months[date.getMonth()]} ${date.getFullYear()}`;

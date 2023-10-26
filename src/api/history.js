import { DOMAIN_URL, HISTORY_PATH } from '../config';
import { getHeader } from './util';

export const getReviewerHistory = async(reviewerId) => {
  try {
    const resp = await fetch(`${DOMAIN_URL}${HISTORY_PATH}/${reviewerId}`, {
      headers: getHeader(),
    });
    const data = await resp.json();

    return data?.data || [];
  } catch(err) {
    console.error(err);
    return null;
  }
}

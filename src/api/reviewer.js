import { DOMAIN_URL, REVIEWER_PATH } from '../config';
import { getHeader } from './util';

export const getReviewerById = async(id) => {
  try {
    const resp = await fetch(`${DOMAIN_URL}${REVIEWER_PATH}/${id}`, {
      headers: getHeader(),
    });
    const data = await resp.json();

    return data.data || null;
  } catch(err) {
    console.error(err);
    return null;
  }
}

export const searchReviewers = async(name) => {
  try {
    const resp = await fetch(`${DOMAIN_URL}${REVIEWER_PATH}/search?name=${name}`, {
      headers: getHeader(),
    });
    const data = await resp.json();

    return data.data || [];
  } catch(err) {
    console.error(err);
    return null;
  }
}

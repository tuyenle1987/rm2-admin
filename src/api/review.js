import { DOMAIN_URL, REVIEW_PATH } from '../config';
import { getHeader } from './util';

export const getManagerReviews = async(companyId, managerId) => {
  try {
    const resp = await fetch(`${DOMAIN_URL}${REVIEW_PATH}/search?company=${companyId}&manager=${managerId}`, {
      headers: getHeader(),
    });
    const data = await resp.json();

    return data.data || [];
  } catch(err) {
    console.error(err);
    return [];
  }
}

export const createReview = async(data) => {
  try {
    const resp = await fetch(
      `${DOMAIN_URL}${REVIEW_PATH}`,
      {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify(data)
      }
    );
    if (resp.status !== 201) {
      const body = await resp.json();
      throw body;
    }

    return resp;
  } catch(err) {
    console.error(err);
    throw err;
  }
}

import { DOMAIN_URL, PENDING_PATH } from '../config';
import { getHeader } from './util';

export const createPending = async(data) => {
  try {
    const resp = await fetch(
      `${DOMAIN_URL}${PENDING_PATH}`,
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

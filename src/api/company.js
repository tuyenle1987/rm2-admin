import { DOMAIN_URL, COMPANY_PATH } from '../config';
import { getHeader } from './util';

export const getCompanyByName = async(name) => {
  try {
    const resp = await fetch(`${DOMAIN_URL}${COMPANY_PATH}/search?name=${name}`, {
      headers: getHeader(),
    });
    const data = await resp.json();

    return data?.data[0] || null;
  } catch(err) {
    console.error(err);
    return null;
  }
}

import moment from 'moment';

export function formatDate(str) {
  return moment(str).format('ll');
}

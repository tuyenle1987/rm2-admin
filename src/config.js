const ENV = process.env.NODE_ENV;

let DOMAIN_URL_ = 'http://localhost:3000';

if (ENV === 'production') {
  DOMAIN_URL_ = 'https://rm2-3fb4579ee6f5.herokuapp.com';
}

export const DOMAIN_URL = DOMAIN_URL_;
export const COMPANY_PATH = '/api/v1/company';
export const REVIEWER_PATH = '/api/v1/reviewer';
export const REVIEW_PATH = '/api/v1/review';
export const PENDING_PATH = '/api/v1/pending';
export const HISTORY_PATH = '/api/v1/history';

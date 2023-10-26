import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-762h4ith0xunyeup.us.auth0.com"
    clientId="fpxxqNtqxJ7AH3Fha8Vvfz6rNQlIvBYN"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://dev-762h4ith0xunyeup.us.auth0.com/api/v2/",
      scope: "read:current_user update:current_user_metadata"
    }}
  >
    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from './components/Layout';
import Home from './pages/Home';

import 'react-responsive-pagination/themes/classic.css';

function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [ userMetadata, setUserMetadata ] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'dev-762h4ith0xunyeup.us.auth0.com';

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: 'read:current_user',
          },
        });

        console.log(user);

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userMetadata = await metadataResponse.json();

        userMetadata.accessToken = accessToken;

        setUserMetadata(userMetadata);
        window.idms = userMetadata;
      } catch (e) {
        console.error(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <HashRouter>
      <Routes>
        <Route path='/:reviewerId?' element={<Layout />}>
          <Route index element={<Home user={userMetadata} />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

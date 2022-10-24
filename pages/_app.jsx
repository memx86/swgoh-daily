import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import PropTypes from 'prop-types';

import theme from '../src/config/theme';
import createEmotionCache from '../src/config/createEmotionCache';

import { UserContext } from '../src/context';

import '../src/services/axios';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/db';
import { useRouter } from 'next/router';

const clientSideEmotionCache = createEmotionCache();

const initialState = { uid: '' };

const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [user, setUser] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    const onChangeUser = user => {
      if (!user) {
        setUser(initialState);
        router.push('/login');
        return;
      }
      setUser(user);
      router.push('/');
    };

    const authStateObserver = onAuthStateChanged(auth, user =>
      onChangeUser(user),
    );

    return () => {
      authStateObserver();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SWGoH dailies</title>
      </Head>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, setUser }}>
          <CssBaseline />
          <Component {...pageProps} />
        </UserContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default App;

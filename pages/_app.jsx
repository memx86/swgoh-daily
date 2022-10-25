import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import theme from '../src/config/theme';
import createEmotionCache from '../src/config/createEmotionCache';

import { UserContext } from '../src/context';

import '../src/services/axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/db';
import FullScreenLoader from '../src/components/FullScreenLoader';

const clientSideEmotionCache = createEmotionCache();

const initialState = { uid: '' };

const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [user, setUser] = useState(initialState);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {isLoading ? <FullScreenLoader /> : <Component {...pageProps} />}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
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

import '../src/services/axios';
import '../src/styles/index.scss';

import Layout from '../src/components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

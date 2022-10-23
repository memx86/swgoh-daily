import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <Box display={'flex'} flexDirection={'column'} minHeight={'100vh'}>
      <Header />
      <Box component={'main'} flexGrow={1}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

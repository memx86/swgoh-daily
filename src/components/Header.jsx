import {
  Container,
  Box,
  Button,
  AppBar,
  Toolbar,
  useTheme,
} from '@mui/material';
import { useUser } from '../hooks';
import { logoutUser } from '../services';
import NavBar from './NavBar';

const Header = () => {
  const { uid } = useUser();
  const theme = useTheme();

  return (
    <Box component={'header'}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: theme.palette.primary.light }}
      >
        <Container maxWidth="sm">
          <Toolbar disableGutters>
            <NavBar />
            {uid && (
              <Button
                color="inherit"
                onClick={logoutUser}
                type="button"
                variant="outlined"
                sx={{ marginLeft: 'auto' }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;

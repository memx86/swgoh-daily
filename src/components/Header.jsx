import { Typography, Container, Box, Button } from '@mui/material';
import { useUser } from '../hooks';
import { logoutUser } from '../services';

const Header = () => {
  const { uid } = useUser();

  return (
    <Box component={'header'}>
      <Container>
        <Typography>
          {uid && (
            <Button onClick={logoutUser} type="button" variant="outlined">
              Logout
            </Button>
          )}
        </Typography>
      </Container>
    </Box>
  );
};

export default Header;

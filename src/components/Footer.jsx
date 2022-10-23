import { Container, Typography, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box component={'footer'}>
      <Container
        sx={{ textAlign: 'center', paddingTop: '1rem', paddingBottom: '1rem' }}
      >
        <Typography>
          &copy; Developed by memx86. You can find game here:&nbsp;
          <Link
            href="https://www.ea.com/games/starwars/galaxy-of-heroes"
            target="_blank"
            rel="noopener noreferrer"
          >
            Star Wars: Galaxy of Heroes
          </Link>
        </Typography>
        <Typography fontSize="0.5rem">
          STAR WARS &copy; & TM 2019 Lucasfilm Ltd. All rights reserved. Game
          code and certain audio and/or visual material &copy; 2019 Electronic
          Arts Inc. Apple and the Apple logo are trademarks of Apple Inc.,
          registered in the U.S. and other countries. App Store is a service
          mark of Apple Inc. Android and Google Play are trademarks of Google
          Inc.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

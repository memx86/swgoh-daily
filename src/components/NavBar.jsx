import styled from '@emotion/styled';
import { Box, useTheme } from '@mui/material';
import Link from './Link';

const List = styled.ul`
  padding-left: 0;
  display: flex;
  gap: 1rem;
  aligm-items: center;
  list-style: none;
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavBar = () => {
  const theme = useTheme();
  return (
    <Box component="nav">
      <List>
        <Item>
          <Link color={theme.palette.primary.contrastText} href="/">
            Dailies
          </Link>
        </Item>
        <Item>
          <Link color={theme.palette.primary.contrastText} href="/lightside">
            Light Side
          </Link>
        </Item>
        <Item>
          <Link color={theme.palette.primary.contrastText} href="/darkside">
            Dark Side
          </Link>
        </Item>
      </List>
    </Box>
  );
};

export default NavBar;

import Container from './Container';

import s from '../styles/components/Header.module.scss';

const Header = () => {
  return (
    <header className={s.header}>
      <Container>Header</Container>
    </header>
  );
};

export default Header;

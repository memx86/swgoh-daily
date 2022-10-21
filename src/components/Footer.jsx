import Container from './Container';

import s from '../styles/components/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container>
        <p className={s.text}>&copy; memx86, 2022</p>
      </Container>
    </footer>
  );
};

export default Footer;

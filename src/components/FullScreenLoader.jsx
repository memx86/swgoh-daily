import styled from '@emotion/styled';
import Loader from './Loader';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.palette.primary.contrastText}66;
`;

const FullScreenLoader = () => {
  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
};

export default FullScreenLoader;

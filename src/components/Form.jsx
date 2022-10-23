import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const FormStyled = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
`;

const Form = ({ children, ...props }) => {
  return <FormStyled {...props}>{children}</FormStyled>;
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Form;

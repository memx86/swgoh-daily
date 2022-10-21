import PropTypes from "prop-types";
import s from "../styles/components/Container.module.scss";

const Container = ({ children, className = "" }) => {
  return <div className={`${s.container} ${className}`}>{children}</div>;
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Container;

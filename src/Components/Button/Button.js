import './Button.scss';

const Button = ({ children, className = '', onClick }) => (
  <button className={`btn ${className} custom-button`} onClick={onClick}>
    {children}
  </button>
);

export default Button;

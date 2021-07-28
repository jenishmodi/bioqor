import './Button.scss';

const Button = ({ children, onClick }) => (
  <button className="btn button" onClick={onClick}>
    {children}
  </button>
);

export default Button;

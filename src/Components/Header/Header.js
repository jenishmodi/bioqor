import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { AppContext, setIsAdminLoggedIn } from 'context/AppContext';
import './Header.scss';

const Header = () => {
  const { products, isAdminLoggedIn, dispatch } = useContext(AppContext);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    dispatch(setIsAdminLoggedIn(false));
  };

  return (
    <Navbar className="header" collapseOnSelect expand="lg">
      <Container>
        <NavLink className="navbar-brand" to="/">
          <img
            src="https://www.bioqor.in/wp-content/uploads/2020/08/BioQor-Logo-Option-03-07-page-001.png"
            alt="Logo"
            className="logo"
          />
        </NavLink>

        <Navbar.Toggle aria-controls="toggler" />

        <Navbar.Collapse id="toggler">
          <Nav className="ml-auto" />
          {isAdminLoggedIn ? (
            <Nav>
              <NavLink to="/admin/products" className="nav-link">
                Products
              </NavLink>
              <NavLink to="/admin/distributors" className="nav-link">
                Distributors
              </NavLink>
              <NavLink to="/admin/doctors" className="nav-link">
                Doctors
              </NavLink>
              <NavLink to="/admin/employees" className="nav-link">
                Employees
              </NavLink>
              <NavLink to="/admin/sales" className="nav-link">
                Sales
              </NavLink>
              <NavLink to="" onClick={logoutHandler} className="nav-link">
                Logout
              </NavLink>
            </Nav>
          ) : (
            <Nav>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/about-us" className="nav-link">
                About Us
              </NavLink>
              <NavDropdown
                className="products-dropdown"
                title="Products"
                id="collasible-nav-dropdown"
              >
                {products.slice(0, 10).map((product) => (
                  <NavLink
                    key={product._id}
                    className="dropdown-item"
                    to={`/products/${product.name.replaceAll(' ', '-')}`}
                  >
                    {product.name}
                  </NavLink>
                ))}
              </NavDropdown>
              <NavLink to="/contact-us" className="nav-link">
                Contact Us
              </NavLink>
              {/* <NavLink to="/" className="nav-link">Blog</NavLink> */}
              <NavLink to="/admin/login" className="nav-link">
                Login
              </NavLink>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

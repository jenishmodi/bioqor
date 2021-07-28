import { Container, Nav, Navbar } from 'react-bootstrap';
import './Header.scss';

const Header = () => {
  return (
    <Navbar className="header" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="https://www.bioqor.in/wp-content/uploads/2020/08/BioQor-Logo-Option-03-07-page-001.png"
            alt="Logo"
            className="logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="toggler" />

        <Navbar.Collapse id="toggler">
          <Nav className="me-auto" />
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about-us">About Us</Nav.Link>
            <Nav.Link href="/">Products</Nav.Link>
            <Nav.Link href="/contact-us">Contact Us</Nav.Link>
            <Nav.Link href="/">Blog</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

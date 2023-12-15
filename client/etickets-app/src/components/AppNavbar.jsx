import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import { useContext } from 'react';

function AppNavbar() {
  const {
    userId,
    setUserId,
    userName,
    setUserName,
    accountId,
    setAccountId,
    isAdmin,
    setIsAdmin,
    eventArray,
    setEventArray,
    load,
    setLoad,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const logout = () => {
    setUserId('');
    setUserName('');
    setAccountId('');
    setIsAdmin(false);
    setLoad(0);
    navigate('/login');
  };

  const leftNav = isAdmin ? (
    <Nav.Link eventKey="2" as={NavLink} to="/event/add-event">
      Add Event
    </Nav.Link>
  ) : null;

  const rightNav = !userName ? (
    <>
      <Nav.Link eventKey="3" as={NavLink} to="/login">
        Login
      </Nav.Link>
      <Nav.Link eventKey="4" as={NavLink} to="/register">
        Register
      </Nav.Link>
    </>
  ) : (
    // <Nav.Link onClick={logout}>Logout</Nav.Link>
    <>
      <Nav.Link as={NavLink} to="/user-account">
        My Account
      </Nav.Link>
      <NavDropdown title={userName} id="basic-nav-dropdown">
        <Nav.Link onClick={logout}>Logout</Nav.Link>
      </NavDropdown>
    </>
  );

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">eTickets</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link eventKey="1" as={NavLink} to="/">
              Events
            </Nav.Link>
            <Nav.Link eventKey="2" as={NavLink} to="/filter">
              Filter
            </Nav.Link>
            {leftNav}
            {/* <Nav.Link eventKey="2" as={NavLink} to="/event/add-event">
              Add Event
            </Nav.Link> */}
          </Nav>
          <Nav>
            {rightNav}
            {/* <Nav.Link eventKey="3" as={NavLink} to="/login">
              Login
            </Nav.Link>
            <Nav.Link eventKey="4" as={NavLink} to="/register">
              Register
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default AppNavbar;

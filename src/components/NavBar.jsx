import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import ThemeToggler from './ThemeToggler';

// Define default logo styles
const Logo = styled.img`
  width: ${({ width }) => width || '50px'};
  height: ${({ height }) => height || '40px'};
`;

// External Link styles with theme handling
const ExternalNavLink = styled.a`
  color: ${({ theme }) => theme.navbarTheme.linkColor}; // Use theme for color
  font-weight: bold; // Set font weight to bold
  &:hover {
    color: ${({ theme }) => theme.navbarTheme.linkHoverColor}; // Use theme for hover color
  }
`;

const InternalNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.navbarTheme.linkColor}; // Use theme for color
  font-weight: bold; // Set font weight to bold
  &:hover {
    color: ${({ theme }) => theme.navbarTheme.linkHoverColor}; // Use theme for hover color
  }
  &.navbar__link--active {
    color: ${({ theme }) => theme.navbarTheme.linkActiveColor}; // Use theme for active color
  }
`;

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  // Fetch navbar data
  useEffect(() => {
    fetch(endpoints.navbar, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Navbar
      fixed="top"
      expand="md"
      className={`navbar-custom transparent-navbar ${theme.mode}-mode`}
      expanded={expanded}
    >
      <Container>
        {/* Logo rendering with fallback to default dimensions */}
        {data?.logo && (
          <Navbar.Brand href="/">
            <Logo
              src={data?.logo?.source}
              alt="main logo"
              width={data?.logo?.width}
              height={data?.logo?.height}
            />
          </Navbar.Brand>
        )}

        {/* Toggle button for mobile */}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />

          {/* Navigation Links */}
          <Nav>
            {data && data.sections?.map((section, index) => (
              section?.type === 'link' ? (
                <ExternalNavLink
                  key={section.title}
                  href={section.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setExpanded(false)}
                  className="navbar__link"
                >
                  {section.title}
                </ExternalNavLink>
              ) : (
                <InternalNavLink
                  key={section.title}
                  onClick={() => setExpanded(false)}
                  exact={index === 0}
                  activeClassName="navbar__link--active"
                  className="navbar__link"
                  to={section.href}
                >
                  {section.title}
                </InternalNavLink>
              )
            ))}
          </Nav>

          {/* Theme Toggler */}
          <ThemeToggler onClick={() => setExpanded(false)} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withRouter(NavBar);

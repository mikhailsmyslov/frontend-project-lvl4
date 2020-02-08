import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlackHash } from '@fortawesome/free-brands-svg-icons';

const SideBar = (props) => {
  const { channels, className } = props;

  return (
    <Navbar bg="dark" variant="dark" className={className} expand="md">
      <Navbar.Brand href="#" className="border-bottom border-secondary">
        <FontAwesomeIcon icon={faSlackHash} className="mr-2" />
        Shlack
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="sidebar-nav" />
      <Navbar.Collapse id="sidebar-nav" className="flex-column">
        <h4 className="text-secondary">Channels</h4>
        <Nav className="flex-column">
          {channels.map(({ id, name }) => (
            <Nav.Link key={id} href={`#${name}`}>{name}</Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  channels: state.channels.channels,
});

export default connect(mapStateToProps)(SideBar);

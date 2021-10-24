import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const userLinks = (
    <Fragment>
      <li><Link to="/posts">Community</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><a href="#!" onClick={logout}>Logout</a></li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </Fragment>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      <ul>
        <li><Link to="/profiles">Developers</Link></li>
        {loading ? null : isAuthenticated ? userLinks : guestLinks}
      </ul>
    </nav>
  )
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(NavBar);
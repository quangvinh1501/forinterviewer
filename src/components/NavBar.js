import React from 'react';
import { NavLink } from 'react-router-dom';
const NavBar = () => {
    const isActivefunc = (match, location) => {
        console.log(match, location)
        return match
    }
    return (
        <>
    <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark navbar-theme">
    <a className="navbar-brand" href="/">
      <img src="../assets/logo/logo1.jpg" style={{ maxHeight: "60px" }} alt=""/>
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#main-menu"
      aria-controls="main-menu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div
      className="collapse navbar-collapse justify-content-md-center"
      id="main-menu"
    >
      <ul className="navbar-nav text-uppercase nav-margin-top">
        <li className="nav-item">
          <NavLink
            isActive={isActivefunc}
            exact
            activeClassName="active"
            className="nav-link"
            to="/"
          >
            REACT HOOK
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            exact
            activeClassName="active"
            className="nav-link"
            to="/redux"
          >
            REACT REDUX
          </NavLink>
        </li>
      </ul>
    </div>
    <div className="navbar-collapse justify-content-md-center collapse">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            className="nav-link"
            href="/"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ color: "white" }}
          >
            Hi! Vinh{" "}
            <img
              src="../assets/avatar/avatar1.png"
              style={{ height: "40px", width: "40px" }}
              className="rounded-circle"
              alt=""
            />
          </a>
        </li>
      </ul>
    </div>
    </nav>
    </>
    )
}
export default NavBar;
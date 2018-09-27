import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'
import { logoutUser } from '../actions.js'

const Nav = ({ user: { loggedIn }, location: { pathname } }) => {

  const logOut = () => {
    logoutUser()
    localStorage.clear()
  }

  return (
    <Menu pointing secondary>
      {loggedIn ? (
        <Fragment>
          <h2 className="Header-title"> Publius </h2>
          <Menu.Menu >
            <Menu.Item position="left" as={NavLink} to="/app" name="Home" active={pathname === '/app'} />
            <Menu.Item position="left" as={NavLink} to="/profile" name="User News" active={pathname === '/profile'} />
            <Menu.Item position="right" as={NavLink} to="/app" name="Logout" onClick={() => logOut()} active={pathname === '/logout'} />
          </Menu.Menu>
        </Fragment>
      ) : (
        <Fragment>
          <h2 className="Header-title"> Publius </h2>
          <Menu.Item position="left" as={NavLink} to="/app" name="Home" active={pathname === '/app'} />
          <Menu.Item position="right" as={NavLink} to="/login" name="Login" active={pathname === '/login'} />
          <Menu.Item as={NavLink} to="/signup" name="Sign Up" active={pathname === '/signup'} />
        </Fragment>
      )}
    </Menu>
  )
}

const mapStateToProps = ({ user } ) => ({ user })


export default withRouter(connect(mapStateToProps, { logoutUser })(Nav))

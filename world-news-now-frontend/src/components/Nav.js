import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'
import { logoutUser } from '../actions.js'

const Nav = ({ user: { loggedIn }, location: { pathname } }) => {

  const logOut = () => {
    console.log("Logged out!");
    logoutUser()
    localStorage.clear()

  }

  return (
    <Menu pointing secondary>
      {loggedIn ? (
        <Fragment>
          <h2 className="Header-title"> Publius </h2>
          <Menu.Menu position="left">
          <Menu.Item as={NavLink} to="/app" name="Home" active={pathname === '/app'} />
          <Menu.Item as={NavLink} to="/profile" name="User Info" active={pathname === '/profile'} />
          <Button onClick={() => logOut()}> Logout </Button>
          </Menu.Menu>
        </Fragment>
      ) : (
        <Fragment>
          <h2 className="Header-title"> Publius </h2>
          <Menu.Item as={NavLink} to="/app" name="Home" active={pathname === '/app'} />
          <Menu.Item as={NavLink} to="/login" name="Login" active={pathname === '/login'} />
          <Menu.Item as={NavLink} to="/signup" name="Sign Up" active={pathname === '/signup'} />
        </Fragment>
      )}
    </Menu>
  )
}

const mapStateToProps = ({ user } ) => ({ user })


export default withRouter(connect(mapStateToProps, { logoutUser })(Nav))

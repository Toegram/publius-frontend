import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { logoutUser } from '../actions.js'
import Searchbar from './Searchbar.js'

const Nav = (props) => {

  const { user, user: { loggedIn }, location: { pathname } } = props

  const logOut = () => {
    logoutUser()
    localStorage.clear()
  }

  return (
    <Menu>
      {loggedIn ? (
        <Fragment>

          <h1 className="Header-title">P U B L I U S . </h1>

            <Menu.Menu position="left" >
              <Menu.Item as={NavLink} to="/app" name="Home" active={pathname === '/app'} icon="home"/>
              <Menu.Item as={NavLink} to="/profile" name="Saved Articles" active={pathname === '/profile'} />
            </Menu.Menu>

            <Menu.Menu position="right">
              <Menu.Item position="right" marginright="100px"><Searchbar /></Menu.Item> 
              <Menu.Item name={user.user.name + ',' + user.user.age + ',' + user.user.country} />
              <Menu.Item  as={NavLink} to="/app" name="Logout" onClick={() => logOut()} active={pathname === '/logout'} icon="sign-out" />
            </Menu.Menu>

          </Fragment>

      ) : (

          <Fragment>
            <h1 className="Header-title">P U B L I U S . </h1>
              <Menu.Item position="left" as={NavLink} to="/app" name="Home" active={pathname === '/app'} icon="home" />
              <Menu.Item position="right"><Searchbar /></Menu.Item>
              <Menu.Item position="right" as={NavLink} to="/login" name="Login" active={pathname === '/login'} icon='sign-in' />
              <Menu.Item as={NavLink} to="/signup" name="Sign Up" active={pathname === '/signup'} icon="edit outline" />
          </Fragment>
      )}
    </Menu>
  )
}

const mapStateToProps = ({ user }) => ({ user })


export default withRouter(connect(mapStateToProps, { logoutUser } )(Nav))

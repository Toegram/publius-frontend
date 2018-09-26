import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const Profile = (props) => {

console.log("User profile props:", props)

  return (
    <Card>

      <Card.Content>
        <Card.Header>Username: {props.userDeets.user ? props.userDeets.user.name : null} </Card.Header>
        <Card.Description>
          Age: {props.userDeets.user ? props.userDeets.user.age : null}
          <br/>
          Country: {props.userDeets.user ? props.userDeets.user.country : null}
          <br/>

          Saved News: 
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  userDeets: state.user
})


export default withAuth(connect(mapStateToProps)(Profile))

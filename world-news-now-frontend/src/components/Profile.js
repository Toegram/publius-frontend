import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

const Profile = ({ username, age, country }) => (

  <Card>

    <Card.Content>
      <Card.Header>{username}</Card.Header>
      <Card.Description>{age} {country}</Card.Description>
    </Card.Content>
  </Card>
)

const mapStateToProps = ({ user: { username, age, country } } ) => ({
  username,
  age,
  country
})


export default withAuth(connect(mapStateToProps)(Profile))

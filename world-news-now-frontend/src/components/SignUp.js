import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { createUser } from '../actions.js'
import { Button, Form, Segment, Message } from 'semantic-ui-react'

class SignUp extends React.Component {

  state = {
    username: '',
    password: '',
    age: 0,
    country: ''
  }

  handleChange = (e, semanticInputData) => {
    this.setState({ [semanticInputData.name]: semanticInputData.value })
  }

  handleSignupSubmit = () => {
    this.props.createUser(this.state.username, this.state.password, this.state.age, this.state.country)

    this.setState({
      username: '',
      password: '',
      age: 0,
      country: ''
    })
  }

  render(){
    console.log("SignUp props", this.props);
    return  this.props.loggedIn ?(
      <Redirect to="/app" />
      ) : (
        <Segment>
          <Form
            onSubmit={this.handleSignupSubmit}
            size="mini"
            key="mini"
            loading={this.props.authenticatingUser}
            error={this.props.failedLogin}
          >
            <Message error header={this.props.failedLogin ? this.props.error : null} />
            <Form.Group widths="equal">
              <Form.Input
                label="Choose A Username"
                placeholder="username"
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <Form.Input
                type="password"
                label="Choose a Password"
                placeholder="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              <Form.Input
                type="number"
                label="Current Age"
                placeholder="age"
                name="age"
                onChange={this.handleChange}
                value={this.state.age}
              />
              <Form.Input
                type="country"
                label="Current Country of Residence"
                placeholder="country"
                name="country"
                onChange={this.handleChange}
                value={this.state.country}
              />
            </Form.Group>
            <Button type="submit">Sign Up</Button>
          </Form>
        </Segment>
      )
    }


}

const mapStateToProps = ({ user: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})




export default connect(mapStateToProps, { createUser })(SignUp)

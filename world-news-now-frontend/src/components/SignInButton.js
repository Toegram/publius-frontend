import React from 'react'
import { Button }from 'semantic-ui-react'

const SignInButton = () => (
  <div>
    <Button.Group>
      <Button>Sign Up</Button>
      <Button.Or />
      <Button positive>Log In</Button>
    </Button.Group>
  </div>
)

export default SignInButton

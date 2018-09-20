import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import SignInButton from './SignInButton'

const HeaderBar = () => (
  <div className={"App-title"}>
  <Segment clearing>
    <Header as='h2' floated='right'>
      Publius
      <SignInButton />
    </Header>
  </Segment>
</div>
)

export default HeaderBar

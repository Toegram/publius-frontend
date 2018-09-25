import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

class NewsModal extends Component {
  state = { open: false }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state

    console.log("NEWSMODAL PROPS IS THIS:", this.props);

    if (this.props.newsStories.length === 0) {
      return (<h3> No Stories For This Country </h3>)
    } else {
      console.log(this.props.newsStories.articles);
    return (
      <div>
        <Button onClick={this.show('blurring')}>Get News</Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>
            Article.Title
          </Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src='/images/avatar/large/rachel.png' />
            <Modal.Description>
              <Header>Written by: Article.Author</Header>
              <p>Article.Description</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Whatever
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Save"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )}
  }
}




function mapStateToProps(state){
  return {
    newsStories: state.news.newsStories
  }
}

export default connect(mapStateToProps)(NewsModal)

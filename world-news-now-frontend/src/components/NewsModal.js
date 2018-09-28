import React, { Component } from 'react'
import { Button, Header, Image, Modal, Input, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { saveArticleToUser } from '../actions.js'

class NewsModal extends Component {
  constructor(props){
    super(props)

    this.state = { open: false }

  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  saveNews = (article, userID) => {
    this.close()
    this.props.saveArticleToUser(article, userID)
  }

  render() {
    const { open, dimmer } = this.state

    return (
      <div>

        <Button animated onClick={this.show('blurring')} floated="left">
          <Button.Content visible>Get News For {this.props.selectedCountry}</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>{this.props.newsStories.articles[0].title} </Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={this.props.newsStories.articles[0].urlToImage} />
            <Modal.Description>
              <Header>{this.props.newsStories.articles[0].description}</Header>
              <p>{this.props.newsStories.articles[0].content}</p>
            </Modal.Description>

          </Modal.Content>
          <Modal.Actions>

            { this.props.user.user ?
              <Button
              negative
              icon='heart outline'
              labelPosition='right'
              content="Save"
              onClick={() => this.saveNews(this.props.newsStories.articles[0], this.props.user.user.id)}
              />
            : null }

            <a target="_blank" href={this.props.newsStories.articles[0].url}>
            <Button
            positive
            icon='internet explorer'
            labelPosition='right'
            content="Open Article In Browser"
            onClick={this.close} />
            </a>

          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    selectedCountry: state.country.selectedCountry,
    newsStories: state.news.newsStories,
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return{
    saveArticleToUser: (article, userId) => dispatch(saveArticleToUser(article, userId) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsModal)

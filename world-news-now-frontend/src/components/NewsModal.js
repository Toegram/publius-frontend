import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { saveArticleToUser } from '../actions.js'

class NewsModal extends Component {
  constructor(props){
    super(props)

    this.state = { open: false }

  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  saveNews = (article) => {
    this.props.saveArticleToUser(article)
  }

  render() {
    console.log("NEWSMODAL PROPS", this.props);
    const { open, dimmer } = this.state

    return (
      <div>
        <Button onClick={this.show('blurring')}>Get News For {this.props.selectedCountry} </Button>

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
            <Button
            negative
            icon='heart'
            labelPosition='right'
            content="Save"
            onClick={() => this.saveNews(this.props.newsStories.articles[0])} />

            <a target="_blank" href={this.props.newsStories.articles[0].url}>
            <Button
            positive
            icon='checkmark'
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
    newsStories: state.news.newsStories
  }
}

function mapDispatchToProps(dispatch){
  return{
    saveArticleToUser: (article) => dispatch(saveArticleToUser(article))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsModal)

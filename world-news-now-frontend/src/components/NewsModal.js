import React, { Component } from 'react'
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { saveArticleToUser } from '../actions.js'

class NewsModal extends Component {
  constructor(props){
    super(props)

    this.state = {
      open: false,
      counter: 0
     }

  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  saveNews = (article, userID) => {
    this.close()
    this.props.saveArticleToUser(article, userID)
  }

  nextArticle = () => {
    this.setState({counter: this.state.counter + 1})
  }

  prevArticle = () => {
    if (this.state.counter > 0){
      this.setState({counter: this.state.counter - 1})
    }
  }

  render() {

    const { open, dimmer } = this.state

    // <Button animated onClick={this.show('blurring')} floated="left">
    //   <Button.Content visible>Get News For {this.props.selectedCountry}</Button.Content>
    //   <Button.Content hidden>
    //     <Icon name='arrow right' />
    //   </Button.Content>
    // </Button>

    return (
      <div>


        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>{this.props.newsStories.articles[this.state.counter].title} </Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={this.props.newsStories.articles[this.state.counter].urlToImage} />
            <Modal.Description>
              <Header>{this.props.newsStories.articles[this.state.counter].description}</Header>
              <p>{this.props.newsStories.articles[this.state.counter].content}</p>
            </Modal.Description>

          </Modal.Content>
          <Modal.Actions>


            {this.state.counter > 0 ?
            <Button animated onClick={this.prevArticle} floated="left">
              <Button.Content visible>Previous Article</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow left' />
              </Button.Content>
            </Button>
            : null }


            {this.state.counter < this.props.newsStories.articles.length -1 ?
            <Button animated onClick={this.nextArticle} floated="left">
              <Button.Content visible>Next Article</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
            : null }

            { this.props.user.user ?
              <Button
              negative
              icon='heart outline'
              labelPosition='right'
              content="Save"
              onClick={() => this.saveNews(this.props.newsStories.articles[this.state.counter], this.props.user.user.id)}
              />
            : null }

            <a target="_blank" href={this.props.newsStories.articles[this.state.counter].url}>
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

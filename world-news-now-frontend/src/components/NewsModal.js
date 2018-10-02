import React, { Component, Fragment } from 'react'
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { saveArticleToUser, increaseIndex, decreaseIndex } from '../actions.js'

class NewsModal extends Component {
  constructor(props){
    super(props)

    this.state = {
      counter: parseInt(this.props.indexCounter)
     }

  }

  show = dimmer => () => this.setState({ dimmer, open: true })

  saveNews = (article, userID) => {
    this.close()
    this.props.saveArticleToUser(article, userID)
  }

  nextArticle = () => {
    this.props.increaseIndex
  }

  prevArticle = () => {
    if (this.state.counter > 0){
      this.props.decreaseIndex
    }
  }

  render() {

    console.log("modal props", this.props);

    const { dimmer } = this.state
    const { isOpen } = this.props

    return (
      <div>

        <Modal dimmer={dimmer} open={isOpen} onClose={this.props.close}>

          {this.props.newsToDisplay === 'country' ?
            <Fragment>
              <Modal.Header>{this.props.newsStories.articles[this.props.indexCounter].title} </Modal.Header>
              <Modal.Content image>
              <Image wrapped size='medium' src={this.props.newsStories.articles[this.props.indexCounter].urlToImage} />
              <Modal.Description>
              <Header>{this.props.newsStories.articles[this.props.indexCounter].description}</Header>
              <p>{this.props.newsStories.articles[this.props.indexCounter].content}</p>
              </Modal.Description>
              </Modal.Content>
            </Fragment>

          :

            <Fragment>
              <Modal.Header>{this.props.filteredNews.articles ? this.props.filteredNews.articles[this.props.indexCounter].title : null} </Modal.Header>
              <Modal.Content image>
              <Image wrapped size='medium' src={this.props.filteredNews.articles ? this.props.filteredNews.articles[this.props.indexCounter].urlToImage : null} />
              <Modal.Description>
              <Header>{this.props.filteredNews.articles ?  this.props.filteredNews.articles[this.props.indexCounter].description : null}
              </Header>
              <p>{this.props.filteredNews.articles ? this.props.filteredNews.articles[this.props.indexCounter].content : null}</p>
              </Modal.Description>
              </Modal.Content>
            </Fragment>

          }


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
    user: state.user,
    indexCounter: state.news.indexCounter,
    newsToDisplay: state.news.newsToDisplay,
    filteredNews: state.news.filteredSearch
  }
}

function mapDispatchToProps(dispatch){
  return{
    saveArticleToUser: (article, userId) => dispatch(saveArticleToUser(article, userId) ),
    increaseIndex: () => dispatch(increaseIndex() ),
    decreaseIndex: () => dispatch(decreaseIndex() )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsModal)

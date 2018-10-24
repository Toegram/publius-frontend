import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import { Button, Card, Image } from 'semantic-ui-react'
import { removeArticleFromUser, fetchCurrentUser } from '../actions.js'


class Profile extends Component{

  // componentDidMount =() => {
  //   this.props.fetchCurrentUser()
  // }

  deleteNews = (article) => {
    this.props.removeArticleFromUser(article, this.props.userDeets.user.id)
  }

  render() {
    return (
      <Card.Group>
        {this.props.userDeets.user ? this.props.userDeets.user.news.map ( article => {
          return (

            <Card key={article.id}>

              <Card.Content>
                <Image floated='right' size='mini' src={article.urlToImage} />
                <Card.Header>{article.title}</Card.Header>
                <Card.Meta>{article.author}</Card.Meta>
                <Card.Description>
                  {article.description}
                </Card.Description>
              </Card.Content>

              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button basic color='red' onClick={ () => this.deleteNews(article) }>
                    Delete
                  </Button>
                    <a target="_blank" href={article.url}> <Button basic color='green'>
                      Open In Browser
                  </Button> </a>
                </div>
              </Card.Content>
            </Card>
          )
        })
        : null
        }

      </Card.Group>
    )
  }
}

  const mapStateToProps = (state) => {
    return {
      userDeets: state.user
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return{
      removeArticleFromUser: (article, userId) => dispatch(removeArticleFromUser(article, userId)),
      fetchCurrentUser: () => dispatch(fetchCurrentUser)
    }
  }


export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Profile))

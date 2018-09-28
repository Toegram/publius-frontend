import React from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import { Button, Card, Image } from 'semantic-ui-react'
import { removeArticleFromUser } from '../actions.js'

const Profile = (props) => {

  const deleteNews = (article) => {
    props.removeArticleFromUser(article, props.userDeets.user.id)
    console.log("Delete this one:", article.id);
    console.log("User id is", props.userDeets.user.id);
  }

  return (
    <Card.Group>
      {props.userDeets.user ? props.userDeets.user.news.map ( article => {
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
                <Button basic color='red' onClick={ () => deleteNews(article) }>
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

const mapStateToProps = (state) => ({
  userDeets: state.user
})

function mapDispatchToProps(dispatch){
  return{ removeArticleFromUser: (article, userId) => dispatch(removeArticleFromUser(article, userId)) }
}


export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Profile))

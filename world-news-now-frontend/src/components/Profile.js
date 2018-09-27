import React from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import { Button, Card, Image } from 'semantic-ui-react'

const Profile = (props) => {

console.log("User profile props:", props)

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
            <Button basic color='red'>
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
  userDeets: state.user,
  newsDeets: state.news
})


export default withAuth(connect(mapStateToProps)(Profile))



// <Card>
//   <Card.Content>
//     <Card.Header>User: {props.userDeets.user ? props.userDeets.user.name + ', ' + props.userDeets.user.age + ', ' + props.userDeets.user.country : null} </Card.Header>
//     <Card.Description>
//       Saved News: { props.userDeets.user ? props.userDeets.user.news.map ( news => news.url ) : null }
//     </Card.Description>
//   </Card.Content>
// </Card>

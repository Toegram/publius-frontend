import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import WorldMap from './WorldMap.js'

class NewsSidebar extends Component {
  constructor(props){
    super(props)

    this.state = { visible: false }

  }

  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })

  render() {

    const { visible } = this.state

    console.log("SIDE BAR PROPS", this.props);


    return (

      <div>

        <Sidebar.Pushable as={Segment}>

          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='wide'
          >

            {this.props.news.newsStories.articles && this.props.news.newsStories.articles.length > 0 ?
              this.props.news.newsStories.articles.map( article => {

              return <Menu.Item key={article.id} onClick={() => console.log("Clicked!", article)}> {article.title} </Menu.Item> })

            : null }

          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <WorldMap handleButtonClick={this.handleButtonClick}/>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news
  }
}

export default connect(mapStateToProps)(NewsSidebar)

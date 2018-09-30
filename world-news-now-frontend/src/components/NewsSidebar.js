import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Segment, Sidebar, Header } from 'semantic-ui-react'
import WorldMap from './WorldMap.js'
import NewsModal from './NewsModal'
import countryNames from '../countryNames.js'

class NewsSidebar extends Component {
  constructor(props){
    super(props)

    this.state = { visible: false }

  }

  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false })

  render() {

    const { visible } = this.state

    const countryID = this.props.selectedCountry

    console.log("SIDE BAR PROPS", this.props);

    const styles ={
      color: "white"
    }

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

            <h2 style={styles}> {countryNames[countryID]} News </h2>
            <hr/>
            {this.props.news.newsStories.articles && this.props.news.newsStories.articles.length > 0 ?
              this.props.news.newsStories.articles.map( article => {


              return <Menu.Item key={article.title} onClick={ () => <NewsModal /> }> {article.title} </Menu.Item>

              })

            :

            <h3 style={styles}> Nothing to report from {countryNames[countryID]}. Everything is fine. </h3>

            }

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
    news: state.news,
    selectedCountry: state.country.selectedCountry
  }
}

export default connect(mapStateToProps)(NewsSidebar)

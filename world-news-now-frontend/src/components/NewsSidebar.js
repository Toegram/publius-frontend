import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Menu, Segment, Sidebar, Header } from 'semantic-ui-react'
import WorldMap from './WorldMap.js'
import NewsModal from './NewsModal'
import countryNames from '../countryNames.js'
import { saveIndexCounter } from '../actions.js'


class NewsSidebar extends Component {
  constructor(props){
    super(props)

    this.state = {
      visible: false,
      clicked: false,
    }

  }

  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false})

  handleArticleClick = (event) => {
    this.setState({ clicked: !this.state.clicked })
    this.props.saveIndexCounter(event.target.id)
  }



  render() {

    console.log("Sidepar Props", this.props);
    // console.log("SIDEBAR.STATE.CLICKED", this.state.clicked);

    const { visible } = this.state

    const countryID = this.props.selectedCountry

    let indexCounter = -1

    const styles ={
      color: "white"
    }

    return (
      <Fragment>
        <div className="Sidebar">

          <Sidebar.Pushable as={Segment}>

            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={visible}
              width='wide'>

              <h2 style={styles}> {countryNames[countryID]} News </h2>
              <hr/>

            {
              this.props.news.newsStories.articles && this.props.news.newsStories.articles.length > 0 ?
              this.props.news.newsStories.articles.map( article => {

                indexCounter += 1

                return <Menu.Item key={indexCounter} id={indexCounter} onClick={(event) => this.handleArticleClick(event)}> {article.title} </Menu.Item>


              })

              :

              <h3 style={styles}> Nothing to report from {countryNames[countryID]}. Everything is fine. </h3>
            }

            </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <WorldMap handleButtonClick={this.handleButtonClick}/>

              { this.state.clicked && this.props.news.newsStories.articles && this.props.news.newsStories.articles.length > 0 ? <NewsModal /> : null }

            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>

    </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news,
    selectedCountry: state.country.selectedCountry
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveIndexCounter: (indexCounter) => dispatch(saveIndexCounter(indexCounter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsSidebar)

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Menu, Segment, Sidebar, Header, Button } from 'semantic-ui-react'
import WorldMap from './WorldMap.js'
import NewsModal from './NewsModal'
import countryNames from '../countryNames.js'
import { saveIndexCounter, setNewsToDisplay } from '../actions.js'


class NewsSidebar extends Component {
  constructor(props){
    super(props)

    this.state = {
      visible: false,
      open: false,
    }

  }

  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })

  handleButtonClick = () => this.setState({ visible: !this.state.visible })

  handleSidebarHide = () => this.setState({ visible: false})

  handleArticleClick = (event) => {
    this.props.saveIndexCounter(event.target.id)
    this.open()
  }

  tabSetCountry = () => {
    this.props.setNewsToDisplay("country")
  }

  tabSetSearched = () => {
    this.props.setNewsToDisplay("searched")
  }



  render() {

    console.log("Sidebar Props", this.props);

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

              <br/>

              <Button.Group>
                <Button onClick={this.tabSetCountry}>Headlines</Button>
                <Button.Or />
                <Button onClick={this.tabSetSearched}>Searched</Button>
              </Button.Group>

              {this.props.news.newsToDisplay === 'country' ?
              <Fragment>
              <h2 style={styles}> {countryNames[countryID]} News </h2>
              <hr/>

            { this.props.news.newsStories.articles && this.props.news.newsStories.articles.length > 0 ?
              this.props.news.newsStories.articles.map( article => {

                indexCounter += 1

                return <Menu.Item key={indexCounter} id={indexCounter} onClick={(event) => this.handleArticleClick(event)}> {article.title} </Menu.Item>


              })

              :

              <h3 style={styles}> Nothing to report from {countryNames[countryID]}. Everything is fine. </h3>
            }
            </Fragment>

            :

            <Fragment>
              <h2 style={styles}> Searched News </h2>
              <hr/>

              { this.props.news.filteredSearch.articles && this.props.news.filteredSearch.articles.length > 0 ?
              this.props.news.filteredSearch.articles.map( article => {

                indexCounter += 1

                return <Menu.Item key={indexCounter} id={indexCounter} onClick={(event) => this.handleArticleClick(event)}> {article.title} </Menu.Item>

              })
              :
                <h3 style={styles}> No Search Results... Assume everything is fine until further notice. </h3>
              }
            </Fragment>

            }

            </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <WorldMap handleButtonClick={this.handleButtonClick}/>

              {this.props.news.newsStories.articles && this.props.news.newsStories.articles.length > 0 ? <NewsModal close={this.close} isOpen={this.state.open}/> : null }

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
    saveIndexCounter: (indexCounter) => dispatch(saveIndexCounter(indexCounter)),
    setNewsToDisplay: (newsCategory) => dispatch(setNewsToDisplay(newsCategory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsSidebar)

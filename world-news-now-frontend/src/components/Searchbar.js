import React, {Component} from 'react'
import { Input, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getNewsArticlesBySearch} from '../actions.js'


class Searchbar extends Component{
  constructor(props){
    super(props)

    this.state = { searchTerm: '' }
  }

//"Always name your functions after funny puns" - every instructor at Flatiron Web Dev Bootcamp
  theTerminator = (event) => {
    this.setState({ searchTerm: event.target.value})
  }



  render(){
    return(
      <Form onSubmit={() => this.props.getNewsArticlesBySearch(this.state.searchTerm)} >
        <Input action={{ icon: 'search' }} placeholder='Search The World For...' onChange={(event) => this.theTerminator(event)} />
      </Form>
    )
  }

}

function mapStateToProps(state){
  return {
    selectedCountry: state.country.selectedCountry
  }
}

function mapDispatchToProps(dispatch){
  return {
    getNewsArticlesBySearch: (searchTerm) => dispatch(getNewsArticlesBySearch(searchTerm))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)

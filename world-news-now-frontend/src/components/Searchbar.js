import React, {Component} from 'react'
import { Input, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getNewsArticlesBySearch} from '../actions.js'


class Searchbar extends Component{
  constructor(props){
    super(props)

    this.state = { searchTerm: '' }
  }

//"Name your functions after funny puns" - every instructor at Flatiron Bootcamp
  theTerminator = (event) => {
    this.setState({ searchTerm: event.target.value})
  }



  render(){
    console.log("Searchbar state", this.props);
    return(
      <Form onSubmit={() => this.props.getNewsArticlesBySearch(this.props.selectedCountry, this.state.searchTerm)} >
        <Input action={{ icon: 'search' }} placeholder='Search...' onChange={(event) => this.theTerminator(event)} />
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
    getNewsArticlesBySearch: (selectedCountry, searchTerm) => dispatch(getNewsArticlesBySearch(selectedCountry, searchTerm))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)

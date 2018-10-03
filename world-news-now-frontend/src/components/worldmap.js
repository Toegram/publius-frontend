import React from 'react';
import { connect } from 'react-redux'
import { selectCountry, getNewsArticles } from '../actions.js'
import { ComposableMap, ZoomableGroup, Geographies, Geography } from "react-simple-maps"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  marginLeft: "100px"
}

const WorldMap = (props) => {

  const selectCountryAndFetchNews = (event) => {
    props.selectCountry(event, props.getNewsArticles)
    props.handleButtonClick()
  }

  return (
    <div>

    <div style={wrapperStyles} onClick={(event) => selectCountryAndFetchNews(event)} >

      <ComposableMap
        projectionConfig={{
          scale: 205,
          rotation: [-11,0,0],
        }}
        width={980}
        height={551}
        style={{
          width: "115%",
          height: "auto"
        }}>

        <ZoomableGroup center={[0,20]} disablePanning>
          <Geographies geography="/world-50m.json">
            {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
              <Geography
                key={i}
                geography={geography}
                id={geography.id}
                projection={projection}
                style={{
                  default: {
                    fill: "#DCDCDC",
                    stroke: "#404040",
                    strokeWidth: 0.75,
                    outline: "none",
                  },
                  hover: {
                    transition: "0.75s",
                    fill: "#909090",
                    stroke: "#002868",
                    strokeWidth: 0.99,
                    outline: "none",
                  },
                  pressed: {
                    fill: "#909090",
                    stroke: "#BF0A30",
                    strokeWidth: 0.99,
                    outline: "none",
                  },
                }}
                />
            ))}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  </div>
  )
}


function mapStateToProps(state){
  return {
    selectedCountry: state.country.selectedCountry,
    newsStories: state.news.newsStories
  }
}

function mapDispatchToProps(dispatch){
  return {
    selectCountry: (event, callback) => {
      let countryID = event.target.id
      return dispatch(selectCountry(countryID, callback))
    },
    getNewsArticles: (selectedCountry) => dispatch(getNewsArticles(selectedCountry))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorldMap)

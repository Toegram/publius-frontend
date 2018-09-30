import React from 'react';
import { connect } from 'react-redux'
import { selectCountry, getNewsArticles } from '../actions.js'
import NewsModal from './NewsModal.js'
import NewsSideBar from './NewsSidebar.js'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers
} from "react-simple-maps"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980
}

const WorldMap = (props) => {

  console.log("WorldMap Props is This: ", props );

  const selectCountryAndFetchNews = (event) => {
    props.selectCountry(event, props.getNewsArticles)
    props.handleButtonClick()
  }

  // onDoubleClick={props.handleButtonClick}

  return (
    <div>

      <div>
        {props.newsStories.articles && props.newsStories.articles.length > 0 ? <NewsModal /> : null}
      </div>

    <div style={wrapperStyles}
        onClick={(event) => selectCountryAndFetchNews(event)} >
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
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none",
                  },
                  hover: {
                    fill: "#808080",
                    stroke: "#BF0A30",
                    strokeWidth: 0.99,
                    outline: "none",
                  },
                  pressed: {
                    fill: "#BF0A30",
                    stroke: "#002868",
                    strokeWidth: 1.5,
                    outline: "bold",
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

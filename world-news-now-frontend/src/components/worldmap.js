import React from 'react';
import { connect } from 'react-redux'
// import getNews from '../FetchReq.js'
import countryConverter from '../countryCodes.js'

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

const WorldMap = (props) => {

  console.log("props is", props)

  // const handleClick = (event) => {
  //
  //   let countryID = event.target.id
  //
  //   props.dispatch({
  //     type: 'CHANGE_SELECTED_COUNTRY',
  //     payload: countryConverter[countryID]
  //   })
  // }


  return (
    <div style={wrapperStyles}
         onClick={(event) => props.selectCountry(event)} >
      <ComposableMap
        projectionConfig={{
          scale: 205,
          rotation: [-11,0,0],
        }}
        width={980}
        height={551}
        style={{
          width: "100%",
          height: "auto",
        }}
        >
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
                    fill: "#ECEFF1",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none",
                  },
                  hover: {
                    fill: "#002868",
                    stroke: "#607D8B",
                    strokeWidth: 0.75,
                    outline: "none",
                  },
                  pressed: {
                    fill: "#BF0A30",
                    stroke: "#607D8B",
                    strokeWidth: 0.99,
                    outline: "bold",
                  },
                }}
                />
            ))}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

function mapStateToProps(state){
  return {
    selectedCountry: state.selectedCountry
  }
}

function mapDispatchToProps(dispatch){
  return {
    selectCountry: (event) => {
      let countryID = event.target.id
        dispatch({
        type: 'CHANGE_SELECTED_COUNTRY',
        payload: countryConverter[countryID]
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorldMap)

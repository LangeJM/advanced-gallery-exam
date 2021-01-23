import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import worldCities from './worldcities-selection.json'

export const SearchLocation = (props) => {

    const [citiesArray, setCitiesArray] = useState()
    const tempArray = []
    
    useEffect(() => { //Component did mount
        makeCitiesArray()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const makeCitiesArray = () => {
        for (const key in worldCities) {
            const cityObject = {}
            cityObject["value"] = worldCities[key].location
            cityObject["label"] = worldCities[key].location
            tempArray.push(cityObject)
        }
        setCitiesArray(tempArray)
    }

    const customStyles = {
        control: (base, state) => ({
            ...base,
            borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            borderColor: state.isFocused ? "black" : "black",
            boxShadow: state.isFocused ? null : null,
            height: "2rem",
            minHeight: "2rem",
            width: "12rem",
            minWidth: "12rem",
            "&:hover": {
                borderColor: state.isFocused ? "black" : "black"
            }
        }),
        menu: base => ({
            ...base,
            borderRadius: 0,
            marginTop: 0,
        }),
        menuList: base => ({
            ...base,
            padding: 0,
            color: "#666",
        })
    };
    
    return (
      <div className="ml-3" style={{fontSize:"14px", color:"#666"}}>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={{ label: "Filter by location", value: '' }}
                name="cities"
                options={citiesArray}
                onChange={(event) => props.locationInput(event)}
                styles={customStyles}
                theme={theme => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary: '#666',
                        primary25: "lightgrey",
                    },
                    })}
            />
      </div>
    );
}

export default SearchLocation;
import SearchBar from "./SearchBar";
import {Box} from "grommet";
import React from "react";
import {Route, Switch} from "react-router-dom";
import InfoBar from "./InfoBar";

function SearchBarWrapper(props) {
    return (
        <Box
            fill={props.size !== 'large'}
            align='start'
            border={{size: 'medium', color: 'neutral-4', style: 'groove'}}
            elevation='small'
            round='small'
            margin={props.size !== 'large' ? {bottom: 'medium'} : {right: 'medium'}}
            pad='xsmall'
            width='medium'>
            <Route exact path='/'>
                <SearchBar countries={props.countries} setCountries={props.setCountries}/>
            </Route>
            <Route path={`/search/:name`}>
                <InfoBar countries={props.countries} mapSelection={props.mapSelection} setMapSelection={props.setMapSelection}/>
            </Route>
        </Box>
    );
}

export default SearchBarWrapper;
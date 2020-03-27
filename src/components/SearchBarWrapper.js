import SearchBar from "./SearchBar";
import {Box} from "grommet";
import React from "react";
import {Route} from "react-router-dom";
import InfoBar from "./InfoBar";

function SearchBarWrapper(props) {
    return (
        <Box
            fill={props.size === 'large' ? false : 'horizontal'}
            align='start'
            border={{size: 'medium', color: 'neutral-4', style: 'groove'}}
            elevation='small'
            round='small'
            margin={props.size !== 'large' ? {bottom: 'medium'} : {right: 'medium'}}
            pad='xsmall'
            width='medium'>
            <Route exact path='/'>
                <SearchBar {...props}/>
            </Route>
            <Route path={`/search/:name`}>
                <InfoBar {...props}/>
            </Route>
        </Box>
    );
}

export default SearchBarWrapper;
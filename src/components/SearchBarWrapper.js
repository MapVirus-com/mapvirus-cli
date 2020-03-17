import SearchBar from "./SearchBar";
import {Box} from "grommet";
import React from "react";
import {Route, Router, Switch} from "react-router-dom";
import InfoBar from "./InfoBar";

function SearchBarWrapper(props) {
    return (
        <Box
            fill={props.size !== 'large'}
            align='start'
            border={{size: 'medium', color: 'neutral-4', style: 'groove'}}
            elevation='small'
            round='small'
            margin={props.size !== 'large' ? {bottom: 'small'} : {right: 'small'}}
            pad='xsmall'
            width='medium'>
            <Switch>
                <Route exact path='/'>
                    <SearchBar/>
                </Route>
                <Route path={`/search/:name`}>
                    <InfoBar/>
                </Route>
            </Switch>
        </Box>
    );
}

export default SearchBarWrapper;
import React, {useEffect} from "react";
import {Box, Grommet, ResponsiveContext} from 'grommet';
import ReactGA from 'react-ga';

import './App.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import {manipulateSizes} from "./Utils";
import MainScreen from "./components/MainScreen";
import NotFound from "./components/NotFound";

const theme = {
    global: {
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px',
        }
    },
};

function App() {

    function setUpReactGA() {
        ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    }

    useEffect(() => {
        if (process.env.REACT_APP_GA_TRACKING_ID) {
            console.log("Initialized");
            setUpReactGA();
        }
    }, []);

    return (
        <HashRouter>
            <Grommet theme={theme}>
                <ResponsiveContext.Consumer>
                    {size => (
                        <Box full direction='column' margin={{horizontal: manipulateSizes(size, 3)}}>
                            <Switch>
                                <Route exact path={['/', '/search/:name']}>
                                    <MainScreen size={size}/>
                                </Route>
                                <Route path='*'>
                                    <NotFound/>
                                </Route>
                            </Switch>
                        </Box>
                    )}
                </ResponsiveContext.Consumer>
            </Grommet>
        </HashRouter>
    );
}

export default App;

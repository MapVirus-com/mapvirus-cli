import React, {useEffect, useState} from "react";
import {Box, Grommet, ResponsiveContext} from 'grommet';
import ReactGA from 'react-ga';

import {BrowserRouter, Route, Switch} from "react-router-dom";
import {manipulateSizes} from "./Utils";
import MainScreen from "./pages/MainScreen";
import NotFound from "./components/error/NotFound";
import Prevention from "./pages/Prevention";
import ServerDown from "./components/error/ServerDown";
import About from "./pages/About";

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

    const [overlay, setOverlay] = useState(null);

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
        <BrowserRouter>
            <Grommet theme={theme}>
                <ResponsiveContext.Consumer>
                    {size =>
                        <Box full direction='column' margin={{horizontal: manipulateSizes(size, 3)}}>
                            <Switch>
                                <Route exact path={['/', '/search/:name']}>
                                    <MainScreen size={size} overlay={overlay} setOverlay={setOverlay}/>
                                </Route>
                                <Route path='/prevention'>
                                    <Prevention size={size} overlay={overlay} setOverlay={setOverlay}/>
                                </Route>
                                <Route path='/about'>
                                    <About size={size} overlay={overlay} setOverlay={setOverlay}/>
                                </Route>
                                <Route path='/503'>
                                    <ServerDown/>
                                </Route>
                                <Route path='*'>
                                    <NotFound/>
                                </Route>
                            </Switch>
                        </Box>
                    }
                </ResponsiveContext.Consumer>
            </Grommet>
        </BrowserRouter>
    );
}

export default App;

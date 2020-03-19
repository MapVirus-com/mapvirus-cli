import React, {useEffect, useState} from "react";
import {Anchor, Box, Footer, Grommet, ResponsiveContext, Text} from 'grommet';
import ReactGA from 'react-ga';

import './App.css';
import AppBar from "./components/AppBar";
import BarContainer from "./components/BarContainer";
import SidebarWrapper from "./components/SidebarWrapper";
import MapWrapper from "./components/MapWrapper";
import SearchBarWrapper from "./components/SearchBarWrapper";
import CDCNotice from "./components/CDCNotice";
import {HashRouter, Switch} from "react-router-dom";
import Disclaimer from "./components/Disclaimer";
import {manipulateSizes} from "./Utils";

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

    const [showSidebar, setShowSidebar] = useState(false);
    const [mapSelection, setMapSelection] = useState('');
    const [countries, setCountries] = useState([]);
    const [overlay, setOverlay] = useState(null);

    function setUpReactGA() {
        ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    }

    useEffect(() => {
        if (process.env.REACT_APP_GA_TRACKING_ID) {
            setUpReactGA();
        }
    }, []);

    return (
        <HashRouter>
            <Switch>
                <Grommet theme={theme}>
                    <ResponsiveContext.Consumer>
                        {size => (
                            <>
                                <Box direction='column' margin={{horizontal: manipulateSizes(size, 3)}}>

                                    <AppBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} size={size}/>

                                    <BarContainer
                                        background='status-critical'
                                        margin={{bottom: 'medium'}}
                                    >
                                        <CDCNotice/>
                                    </BarContainer>

                                    {/*<BarContainer wrap*/}
                                    {/*              background='dark-3'*/}
                                    {/*              margin={{bottom: 'medium'}}>*/}
                                    {/*    <Clock type="digital"/>*/}
                                    {/*    <Text>Confirmed</Text>*/}
                                    {/*    <Text>Death</Text>*/}
                                    {/*    <Text>Recovered</Text>*/}
                                    {/*</BarContainer>*/}

                                    <Box wrap direction='row'
                                         margin={{bottom: 'medium'}}>
                                        <SearchBarWrapper size={size}
                                                          countries={countries} setCountries={setCountries}
                                                          mapSelection={mapSelection}
                                                          setMapSelection={setMapSelection}/>
                                        <MapWrapper mapSelection={mapSelection} setMapSelection={setMapSelection}
                                                    showSidebar={showSidebar} size={size}
                                                    countries={countries} setCountries={setCountries}/>
                                        <SidebarWrapper showSidebar={showSidebar} setShowSidebar={setShowSidebar}
                                                        size={size}/>
                                    </Box>

                                    <Footer margin={{bottom: 'medium'}} background="brand" pad="medium" round='small'>
                                        <Text>Copyright MapVirus.com 2020</Text>
                                        {/*<SocialShare/>*/}
                                        <Anchor label="Disclaimer" onClick={() => {
                                            if (process.env.REACT_APP_GA_TRACKING_ID) {
                                                ReactGA.event({
                                                    category: "click",
                                                    action: "disclaimer",
                                                });
                                            }
                                            setOverlay(<Disclaimer setOverlay={setOverlay}/>);
                                        }}/>
                                    </Footer>
                                </Box>
                                { overlay }
                            </>
                        )}
                    </ResponsiveContext.Consumer>
                </Grommet>
            </Switch>
        </HashRouter>
    );
}

export default App;

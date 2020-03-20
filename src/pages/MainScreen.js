import {Box} from "grommet";
import AppBar from "../components/AppBar";
import BarContainer from "../components/BarContainer";
import CDCNotice from "../components/CDCNotice";
import SearchBarWrapper from "../components/SearchBarWrapper";
import MapWrapper from "../components/MapWrapper";
import SidebarWrapper from "../components/SidebarWrapper";
import React, {useState} from "react";
import AppFooter from "../components/AppFooter";
import {Helmet} from "react-helmet";

export default function MainScreen(props) {

    const [showSidebar, setShowSidebar] = useState(false);
    const [mapSelection, setMapSelection] = useState('');
    const [countries, setCountries] = useState([]);

    const size = props.size;

    return (
        <>
            <Helmet>
                <title>MapVirus - A Coronavirus Tracker</title>

                <meta name="keywords"
                      content="covid-19, coronavirus, corona, virus, map, tracking, statistics, trends, data, dashboard, information"/>
                <meta name="description"
                      content="Tracking the Coronavirus Outbreak with Numbers: Realtime maps and information on the development of Novel Coronavirus (COVID-19)."/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://mapvirus.com/"/>
                <meta name="og:title" property="og:title"
                      content="MapVirus - Realtime Maps and Information on Coronavirus (COVID-19)"/>
                <meta name="og:description" property="og:description"
                      content="MapVirus is a tracker and dashboard for Coronavirus (COVID-19) with realtime maps and information compiled from authoritative sources."/>
            </Helmet>
            <AppBar showSidebar={showSidebar} size={size}/>
            {/*<AppBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} size={size}/>*/}
            <BarContainer
                background='status-critical'
                margin={{bottom: 'medium'}}
                round='small'
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

            <AppFooter setOverlay={props.setOverlay}/>
            {props.overlay}
        </>
    );
}
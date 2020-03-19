import {Box} from "grommet";
import AppBar from "./AppBar";
import BarContainer from "./BarContainer";
import CDCNotice from "./CDCNotice";
import SearchBarWrapper from "./SearchBarWrapper";
import MapWrapper from "./MapWrapper";
import SidebarWrapper from "./SidebarWrapper";
import React, {useState} from "react";
import AppFooter from "./AppFooter";

export default function MainScreen(props) {

    const [showSidebar, setShowSidebar] = useState(false);
    const [mapSelection, setMapSelection] = useState('');
    const [countries, setCountries] = useState([]);
    const [overlay, setOverlay] = useState(null);

    const size = props.size;

    return (
        <>
            <AppBar showSidebar={showSidebar} size={size}/>
            {/*<AppBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} size={size}/>*/}
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

            <AppFooter setOverlay={setOverlay}/>
            {overlay}
        </>
    );
}
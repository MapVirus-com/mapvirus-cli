import AppMap from "./Map";
import {Anchor, Box, Button, Heading, Layer, Stack, Text} from "grommet";
import React, {useState} from "react";
import {Emergency, FingerPrint, FormClose, LinkPrevious, Validate} from "grommet-icons";

function getOverlaySize(size) {
    return size === 'small' ? 'xsmall' : 'small';
}

function MapWrapper(props) {

    const [infoBox, setInfoBox] = useState([]);
    const [fullscreen, setFullScreen] = useState(false);

    const Map = (
        <Stack anchor='bottom-right'>
            <AppMap mapSelection={props.mapSelection} setMapSelection={props.setMapSelection}
                    setInfoBox={setInfoBox} size={props.size}
                    setSubRegion1={props.setSubRegion1} subRegion1={props.subRegion1}
                    countries={props.countries} setCountries={props.setCountries}
                    fetchingRegion={props.fetchingRegion}
            />

            {Object.keys(infoBox).length > 0 && (
                <Box width={getOverlaySize(props.size)}
                     height={getOverlaySize(props.size)}
                     margin={getOverlaySize(props.size)}
                     pad={getOverlaySize(props.size)}
                     round={getOverlaySize(props.size)}
                     background='transparent'
                     border={{
                         color: 'brand',
                         size: getOverlaySize(props.size),
                     }}
                     style={{
                         opacity: 0.5
                     }}
                     align='start'
                     justify='start'
                     direction='column'
                     overflow='hidden'
                     wrap
                >
                    <Box wrap direction='row' align='center' justify='between'>
                        <Text size={props.size === 'small' ? 'small' : props.size} weight='bold' truncate>{infoBox[0]}</Text>
                    </Box>
                    <Box direction='row' gap='xsmall' align='center' justify='start'>
                        <FingerPrint size='small' color='brand'/>
                        <Text size={props.size === 'small' ? 'xsmall' : props.size} weight='bold' margin='none' color='status-critical'>Confirmed</Text>
                        <Text size={props.size === 'small' ? 'xsmall' : props.size} weight='bold' color='brand' margin='none'>{infoBox[1]}</Text>
                    </Box>
                    <Box direction='row' gap='xsmall' align='center' justify='start'>
                        <Emergency size='small' color='brand'/>
                        <Text size={props.size === 'small' ? 'xsmall' : props.size} weight='bold' margin='none'>Deaths</Text>
                        <Text size={props.size === 'small' ? 'xsmall' : props.size} weight='bold' color='brand' margin='none'>{infoBox[2]}</Text>
                    </Box>
                    <Box direction='row' gap='xsmall' align='center' justify='start'>
                        <Validate size='small' color='brand'/>
                        <Text size={props.size === 'small' ? 'xsmall' : props.size} weight='bold' margin='none' color='status-ok'>Recovered</Text>
                        <Text size={props.size === 'small' ? 'xsmall' : props.size} weight='bold' color='brand' margin='none'>{infoBox[3]}</Text>
                    </Box>
                </Box>
            )
            }
        </Stack>
    );

    return !fullscreen ?
        (
            <Box
                fill='horizontal'
                flex={props.size === 'large'}
                align='center'
                justify='center'
                margin={props.showSidebar && props.size === 'large' ? {right: 'small'} : 'none'}
                round='small'
                border={{size: 'medium', color: 'brand', style: 'groove'}}
                elevation='small'
                width='xlarge'
            >
                <Stack fill anchor='top-right'>
                    {Map}
                    <Box margin='small' style={{display: props.size === 'small' ? 'inherit' : 'none'}}>
                        <Button label="Fullscreen" onClick={() => setFullScreen(true)}/>
                    </Box>
                </Stack>
            </Box>
        ) :
        (
            <Layer full>
                <Box
                    background='light-3'
                    justify='end'
                    align='center'
                    direction='row'
                >
                    <Button
                        icon={<FormClose/>}
                        onClick={() => setFullScreen(false)}
                    />
                </Box>
                {Map}
            </Layer>
        );
}

export default MapWrapper;
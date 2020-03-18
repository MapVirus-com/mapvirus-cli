import AppMap from "./Map";
import {Box, Heading, Stack, Text} from "grommet";
import React, {useState} from "react";

function getOverlaySize(size) {
    return size === 'small' ? 'xsmall' : 'small';
}

function MapWrapper(props) {

    const [infoBox, setInfoBox] = useState([]);

    return (
        <Box fill={props.size !== 'large'}
             flex={props.size === 'large'}
             align='center'
             justify='center'
             margin={props.showSidebar && props.size === 'large' ? {right: 'small'} : 'none'}
             round='small'
             border={{size: 'medium', color: 'brand', style: 'groove'}}
             elevation='small'
             width='xlarge'
        >
            <Stack fill anchor='bottom-right'>
                <AppMap mapSelection={props.mapSelection} setMapSelection={props.setMapSelection}
                        setInfoBox={setInfoBox}
                        countries={props.countries} setCountries={props.setCountries}/>
                <Box width={getOverlaySize(props.size)}
                     height={getOverlaySize(props.size)}
                     margin={getOverlaySize(props.size)}
                     pad={getOverlaySize(props.size)}
                     round={getOverlaySize(props.size)}
                     background='light-5'
                     border={{
                         color: 'brand',
                         size: getOverlaySize(props.size),
                         style: 'dashed'
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
                    {infoBox.length > 0 && (
                        <>
                            <Heading truncate size={getOverlaySize(props.size)}
                                     level={getOverlaySize(props.size) === 'small' ? 4 : 5}
                                     margin='none'>{infoBox[0]}</Heading>
                            <Text size={getOverlaySize(props.size)}>Confirmed {infoBox[1]}</Text>
                            <Text size={getOverlaySize(props.size)}>Deaths {infoBox[2]}</Text>
                            <Text size={getOverlaySize(props.size)}>Recovered {infoBox[3]}</Text>
                        </>
                    )
                    }
                </Box>
            </Stack>
        </Box>
    );
}

export default MapWrapper;
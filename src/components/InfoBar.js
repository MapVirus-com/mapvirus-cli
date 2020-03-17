import React from "react";
import {Anchor, Box, Button, Heading, MaskedInput, RoutedAnchor, Text} from "grommet";
import {LinkPrevious, Location, MapLocation, Search} from "grommet-icons";
import {useParams} from "react-router-dom";

function InfoBar(props) {
    const {name} = useParams();

    return (
        <Box fill='horizontal' justify='end' pad='small' gap='small'>
            <Box wrap direction='row' align='center' justify='between'>
                <RoutedAnchor path='/#/' label={<Heading margin='none' level='3'>Back</Heading>} icon={<LinkPrevious/>}/>
                <Heading margin='none' level='3'>{ name }</Heading>
            </Box>
        </Box>
    );
}

export default InfoBar;
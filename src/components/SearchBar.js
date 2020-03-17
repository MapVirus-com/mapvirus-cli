import React from "react";
import {Anchor, Box, Button, Heading, MaskedInput, Text} from "grommet";
import {Location, MapLocation, Search} from "grommet-icons";

function SearchBar(props) {
    return (
        <Box fill='horizontal' justify='end' pad='small' gap='small'>
            <Anchor label={<Heading margin='none' level='3'>Search</Heading>} icon={<MapLocation/>} href='#'/>
            <MaskedInput></MaskedInput>
            <Box wrap direction='row' align='center' justify='between'>
                <Button icon={<Location/>} label='Locate'/>
                <Button icon={<Search/>} label='View' primary/>
            </Box>
        </Box>
    );
}

export default SearchBar;
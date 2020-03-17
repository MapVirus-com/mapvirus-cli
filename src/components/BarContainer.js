import {Box, Clock} from "grommet";
import React from "react";

function BarContainer(props) {
    return (
        <Box
            tag='header'
            direction='row'
            align='center'
            justify='between'
            pad='small'
            elevation='medium'
            round='xsmall'
            {...props}>

        </Box>
    );
}

export default BarContainer;
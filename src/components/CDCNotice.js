import React from "react";
import {Anchor, Box, Text} from "grommet";
import {Aid} from "grommet-icons";

function CDCNotice(props) {
    return (
        <Box fill wrap direction='row' justify='between' align='center' gap='small' margin='small'>
            <Box direction='row' gap='small' fill={{horizontal: props.size === 'small'}}>
                <Aid/>
                <Text >Please refer to local CDC website for guidelines and instructions.</Text>
            </Box>
            <Anchor href='https://www.cdc.gov/'>United States CDC</Anchor>
        </Box>
    );
}

export default CDCNotice;
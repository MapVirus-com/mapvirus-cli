import React from "react";
import {Anchor, Box, Button, Heading, Layer} from "grommet";
import {FormClose} from "grommet-icons";

function Sources(props) {
    return (
        <Layer>
            <Box
                background='light-3'
                tag='header'
                justify='end'
                align='center'
                direction='row'
            >
                <Button
                    icon={<FormClose/>}
                    onClick={() => props.setOverlay(null)}
                />
            </Box>
            <Box flex width="large" height="large" align='center' justify='center' overflow='auto'>
                <Box margin="medium">
                    <Heading level='3'>Sources</Heading>
                    <Anchor label='JHU CSSE' href='https://github.com/CSSEGISandData/COVID-19'/>
                    <Anchor label='CDC' href='https://www.cdc.gov/coronavirus/2019-ncov/index.html'/>
                </Box>
            </Box>
        </Layer>
    );
}

export default Sources;
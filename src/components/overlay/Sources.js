import React from "react";
import {Anchor, Box, Button, Heading, Layer, Text} from "grommet";
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
                    <Anchor label='WHO' href='https://www.who.int/'/>
                    <Anchor label='New York Times'
                            href='https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html'/>
                    <Anchor label='NY CDC'
                            href='https://coronavirus.health.ny.gov/county-county-breakdown-positive-cases'/>
                    <Anchor label='WA CDC' href='https://www.doh.wa.gov/Emergencies/Coronavirus'/>
                    <Anchor label='MI CDC' href='https://www.michigan.gov/coronavirus'/>
                    <Anchor label='Gov.uk'
                            href='https://www.gov.uk/government/collections/coronavirus-covid-19-list-of-guidance'/>
                    <Text>Some icons on this site are made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></Text>
                </Box>
            </Box>
        </Layer>
    );
}

export default Sources;
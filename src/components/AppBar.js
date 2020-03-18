import {Anchor, Box, Button, Grid, Heading, Text} from "grommet";
import React from "react";
import {Analytics, Map} from "grommet-icons";

function AppBar(props) {
    return (
        <Box
            tag='header'
            direction='row'
            align='center'
            justify='between'
            margin={{top: 'large', bottom: 'medium'}}
            pad='small'
            elevation='large'
            border={{
                size: 'medium',
                color: 'brand'
            }}
            round='small'
        >
            <Grid fill
                  areas={[
                      {name: 'left', start: [0, 0], end: [0, 0]},
                      {name: 'center', start: [1, 0], end: [1, 0]},
                      {name: 'right', start: [2, 0], end: [2, 0]}
                  ]}
                  columns={['flex', 'small', ['xsmall', 'small']]}
                  rows={['fill']}
                  align='center'
                  gap='small'>
                <Box gridArea='left' justify='end' direction='column' margin={{left: 'small'}}>
                    <Anchor href='#' icon={<Map/>}
                            label={<Heading level='3' margin='none'>MapVirus</Heading>}/>
                    {props.size !== 'small' && (
                        <Text color='dark-5' margin='none'>
                            Comprehensive maps and information on Novel Coronavirus
                        </Text>
                    )}
                </Box>
                <Box gridArea='right' align='end' style={{display: 'none'}}>
                    <Button icon={<Analytics/>} onClick={() => {
                        props.setShowSidebar(!props.showSidebar)
                    }}/>
                </Box>
            </Grid>
        </Box>
    );
}

export default AppBar;
import React from "react";
import {Box, Button, Heading, Text} from "grommet";
import {useHistory} from 'react-router-dom';
import CDCNotice from "../CDCNotice";
import BarContainer from "../BarContainer";

export default function NotFound(props) {

    const history = useHistory();

    return (
        <Box style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }} align='center' justify='center'>
            <Box align='center' gap='small'>
                <Heading level='2' color='brand'>Server Unavailable</Heading>
                <Button label='Retry' onClick={() => history.push('/')}/>
            </Box>
        </Box>
    );

}
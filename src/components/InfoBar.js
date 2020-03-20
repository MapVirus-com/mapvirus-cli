import React, {useEffect} from "react";
import {Anchor, Box, Button, Heading} from "grommet";
import {Emergency, FingerPrint, LinkPrevious, Validate} from "grommet-icons";
import {useHistory, useParams} from "react-router-dom";

function InfoBar(props) {
    const {name} = useParams();
    const history = useHistory();

    useEffect(() => {
        props.setMapSelection(name);
    }, [name]);

    if (!props.mapSelection) {
        return (<></>);
    }

    const d = props.countries.find(s => s["country_name"] === props.mapSelection.trim());
    const confirmed = d == null ? 0 : d['stats']["confirmed"];
    const deaths = d == null ? 0 : d['stats']["deaths"];
    const recovered = d == null ? 0 : d['stats']["recovered"];

    if (props.countries.length > 0 && !d) {
        history.push('/404');
    }

    return (
        <Box fill='horizontal' justify='end' pad='small' gap='medium'>
            <Box wrap direction='row' align='center' justify='between'>
                <Anchor label={<Heading margin='none' level='3' onClick={() => {
                    props.setMapSelection(null);
                    history.push('/');
                }}>Back</Heading>} icon={<LinkPrevious/>}/>
                <Heading margin='none' level='3'>{name}</Heading>
            </Box>
            <Box direction='row' gap='xsmall' align='center' justify='start'>
                <FingerPrint color='brand'/> <Heading level='3' margin='none' color='status-critical'>Confirmed</Heading> <Heading level='3' color='brand' margin='none'>{ confirmed }</Heading>
            </Box>
            <Box direction='row' gap='xsmall' align='center' justify='start'>
                <Emergency color='brand'/> <Heading level='3' margin='none'>Deaths</Heading> <Heading level='3' color='brand' margin='none'>{ deaths }</Heading>
            </Box>
            <Box direction='row' gap='xsmall' align='center' justify='start'>
                <Validate color='brand'/> <Heading level='3' margin='none' color='status-ok'>Recovered</Heading> <Heading level='3' color='brand' margin='none'>{ recovered }</Heading>
            </Box>
            <Button label="Learn about Prevention" onClick={() => history.push('/prevention')}/>
        </Box>
    );
}

export default InfoBar;
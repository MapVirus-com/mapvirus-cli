import React, {useEffect} from "react";
import {Anchor, Box, Button, Heading, Text} from "grommet";
import {Emergency, FingerPrint, LinkPrevious, Optimize, Validate} from "grommet-icons";
import {useHistory, useParams} from "react-router-dom";
import {fetchRegions} from "./Network";
import ReactTooltip from "react-tooltip";

function InfoBar(props) {
    const {name} = useParams();
    const history = useHistory();

    const d = props.countries.find(s => name.endsWith(s["country_name"]));

    useEffect(() => {
        if (d) {
            props.setMapSelection(d.country_iso_a3);
            if (d.zoom_available) {
                props.setFetchingRegion(true);
                fetchRegions(props, name)
                    .catch((error) => {
                        console.log(error);
                        history.push('/503');
                    })
            } else {
                props.setSubRegion1({});
            }
        }
    }, [props.countries, name]);

    if (!d) {
        if (Object.keys(props.countries).length > 0) {
            return <NoData {...props}/>
        } else {
            // countries data still loading
            return <Loading/>
        }
    }

    if (d.zoom_available && Object.keys(props.subRegion1).length === 0) {
        // region data loading
        return <Loading/>
    }

    if (d.zoom_available && Object.keys(props.subRegion1).length > 0) {
        return <RegionInfo country={d} name={name} {...props}/>;
    } else {
        return <CountryInfo country={d} name={name} {...props}/>;
    }

}

function Loading(props) {
    return (
        <Box fill align='center' justify='center'>
            <Text>Loading...</Text>
        </Box>
    );
}

function NoData(props) {
    const history = useHistory();

    return (
        <Box fill='horizontal' justify='end' pad='small' gap='medium'>
            <Box wrap direction='row' align='center' justify='between'>
                <Anchor label={<Heading margin='none' level='3' onClick={() => {
                    props.setMapSelection(null);
                    props.setSubRegion1({});
                    history.push('/');
                }}>Back</Heading>} icon={<LinkPrevious/>}/>
                <Heading margin='none' level='3'>Data Not Available</Heading>
            </Box>
            <Box direction='row' gap='xsmall' align='center' justify='start'>
                <FingerPrint color='brand'/> <Heading level='3' margin='none'
                                                      color='status-critical'>Confirmed</Heading> <Heading level='3'
                                                                                                           color='brand'
                                                                                                           margin='none'>?</Heading>
            </Box>
            <Box direction='row' gap='xsmall' align='center' justify='start'>
                <Emergency color='brand'/> <Heading level='3' margin='none'>Deaths</Heading> <Heading level='3'
                                                                                                      color='brand'
                                                                                                      margin='none'>?</Heading>
            </Box>
            <Box direction='row' gap='xsmall' align='center' justify='start'>
                <Validate color='brand'/> <Heading level='3' margin='none' color='status-ok'>Recovered</Heading>
                <Heading level='3' color='brand' margin='none'>?</Heading>
            </Box>
            <Button label="Learn about Prevention" onClick={() => history.push('/prevention')}/>
        </Box>
    )
}

function RegionInfo(props) {
    const history = useHistory();

    const d = props.country;
    let {confirmed, deaths, recovered} = d['stats'];
    const {country_name, country_iso_a3} = d;

    const region = props.subRegion1.regions.find(r => {
        let parts = props.name.split(", ");
        switch (parts.length) {
            case 3:
                return parts[2] === country_name && parts[1] === r.subregion1 && parts[0] === r.region_name;
            case 2:
                return parts[1] === country_name && parts[0] === r.region_name && !r.subregion2;
            default:
                return false;
        }
    });

    let displayName = country_name;

    if (region) {
        if (region.subregion2) {
            displayName = region.region_name + ", " + region.subregion1;
        } else {
            displayName = region.region_name + ", " + country_name;
        }
        confirmed = region.stats.confirmed;
        deaths = region.stats.deaths;
        recovered = region.stats.recovered;
    }

    return (
        <Box fill='horizontal' justify='end' pad='small' gap='medium'>
            <Box wrap direction='row' align='center' justify='between'>
                <Anchor label={<Heading margin='none' level='3' onClick={() => {
                    props.setMapSelection(null);
                    props.setSubRegion1({});
                    history.push('/');
                }}>Back</Heading>} icon={<LinkPrevious/>}/>
                <Heading margin='none' level='3'>{displayName}</Heading>
            </Box>
            <Box direction='row' gap='xsmall' align='center' justify='start'>
                <FingerPrint color='brand'/> <Heading level='3' margin='none'
                                                      color='status-critical'>Confirmed</Heading> <Heading level='3'
                                                                                                           color='brand'
                                                                                                           margin='none'>{confirmed}</Heading>
            </Box>
            <Box direction='row' gap='xsmall' align='center' justify='start'>
                <Emergency color='brand'/> <Heading level='3' margin='none'>Deaths</Heading> <Heading level='3'
                                                                                                      color='brand'
                                                                                                      margin='none'>{deaths}</Heading>
            </Box>
            <Box direction='row' gap='xsmall' align='center' justify='start'>
                <Validate color='brand'/> <Heading level='3' margin='none' color='status-ok'>Recovered</Heading>
                <Heading level='3' color='brand' margin='none'>{recovered}</Heading>
            </Box>
            <Box wrap direction='row' gap='xsmall' align='center' justify='start'>
                <Optimize color='brand'/> <Heading level='3' data-tip='Deaths / Confirmed' margin='none'>Fatality
                Rate</Heading>
                <Heading level='3' color='brand' margin='none'>{Number(deaths / confirmed * 100).toFixed(2)} %</Heading>
            </Box>
            <ReactTooltip/>
            <Button label="Learn about Prevention" onClick={() => history.push('/prevention')}/>
        </Box>
    );
}

function CountryInfo(props) {
    const history = useHistory();

    const d = props.country;

    const {confirmed, deaths, recovered} = d['stats'];
    const {country_name, country_iso_a3} = d;

    if (!props.mapSelection) {
        return (<></>);
    }

    return (
        <Box fill='horizontal' justify='end' pad='small' gap='medium'>
            <Box wrap direction='row' align='center' justify='between'>
                <Anchor label={<Heading margin='none' level='3' onClick={() => {
                    props.setMapSelection(null);
                    history.push('/');
                }}>Back</Heading>} icon={<LinkPrevious/>}/>
                <Heading margin='none' level='3'>{country_name}</Heading>
            </Box>
            <Box direction='row' gap='xsmall' align='center' justify='start'>
                <FingerPrint color='brand'/> <Heading level='3' margin='none'
                                                      color='status-critical'>Confirmed</Heading> <Heading level='3'
                                                                                                           color='brand'
                                                                                                           margin='none'>{confirmed}</Heading>
            </Box>
            <Box direction='row' gap='xsmall' align='center' justify='start'>
                <Emergency color='brand'/> <Heading level='3' margin='none'>Deaths</Heading> <Heading level='3'
                                                                                                      color='brand'
                                                                                                      margin='none'>{deaths}</Heading>
            </Box>
            <Box direction='row' gap='xsmall' align='center' justify='start'>
                <Validate color='brand'/> <Heading level='3' margin='none' color='status-ok'>Recovered</Heading>
                <Heading level='3' color='brand' margin='none'>{recovered}</Heading>
            </Box>
            <Box direction='row' gap='xsmall' align='center' justify='start'>
                <Optimize color='brand'/> <Heading level='3' margin='none'>Case Fatality Rate</Heading>
                <Heading level='3' color='brand' margin='none'>{Number(deaths / confirmed * 100).toFixed(2)} %</Heading>
            </Box>
            <Button label="Learn about Prevention" onClick={() => history.push('/prevention')}/>
        </Box>
    );
}

export default InfoBar;
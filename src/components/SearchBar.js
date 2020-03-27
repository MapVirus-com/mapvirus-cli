import React, {useEffect, useState} from "react";
import {Anchor, Box, Button, Heading, MaskedInput, Text} from "grommet";
import {Location, LocationPin, MapLocation, Search, Waypoint} from "grommet-icons";
import * as Fuse from "fuse.js";
import {useHistory} from "react-router-dom";
import ReactGA from 'react-ga';
import {PulseLoader} from "react-spinners";
import {API_ROOT} from "./Constants";

function SearchBar(props) {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const [error, setError] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [geolocationRegions, setGeolocationRegions] = useState([]);
    const history = useHistory();

    if (process.env.REACT_APP_GA_TRACKING_ID) {
        history.listen(location => {
            ReactGA.set({page: location.pathname});
            ReactGA.pageview(location.pathname);
        });
    }

    useEffect(() => {
        updateRegionOptions(value);
    }, [value]);

    function updateRegionOptions(value) {
        if (!props.countries) {
            return;
        }
        let options = {
            shouldSort: true,
            threshold: 0.25,
            location: 0,
            distance: 20,
            minMatchCharLength: 2,
            keys: [
                'country_name',
                'regions'
            ]
        };
        let fuse = new Fuse(props.countries, options); // "list" is the item array
        let result = fuse.search(value);
        let maskedOptions = result.flatMap(o => {
            let result = [];
            let regions = o.item.regions;
            if (regions) {
                let options = {
                    shouldSort: true,
                    threshold: 0.25,
                    location: 0,
                    distance: 20,
                    minMatchCharLength: 2,
                    keys: ['']
                };
                let regionFuse = new Fuse(regions, options);
                let regionResult = regionFuse.search(value);
                result.push(...regionResult.slice(0, 5).map(p => p.item + ", " + o.item.country_name))
                // console.log(regionResult);
            }
            result.push(o.item.country_name);
            return result;
        }).slice(0, 10);

        setOptions(maskedOptions);
    }

    function requestGeoLocation() {
        setLocationLoading(true);
        navigator.geolocation.getCurrentPosition((position) => {
            return fetch(API_ROOT + "/geolocation", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            })
                .then(res => res.json())
                .then((json) => {
                    setGeolocationRegions(json.regions);
                    setLocationLoading(false);
                }).catch((error) => {
                    setLocationLoading(false);
                })
        }, (error) => {
            setLocationLoading(false);
            console.log(error);
        });
    }

    return (
        <Box fill='horizontal' justify='end' pad='small' gap='medium'>
            <Anchor label={<Heading margin='none' level='3'>View</Heading>} icon={<MapLocation/>}
                    onClick={() => history.push('/')}/>
            <Box>
                <MaskedInput
                    mask={[
                        {
                            options: options,
                            placeholder: "Global"
                        },
                        {fixed: " "}
                    ]}
                    value={value}
                    onChange={event => setValue(event.target.value)}/>
                <Text weight='bold' color='status-error' style={{display: error ? 'inherit' : 'none'}}>Country / Region
                    does not exist.</Text>
            </Box>
            <Box wrap direction='row' align='center' justify='between'>
                <Button margin={{vertical: 'small'}} icon={<Location/>} label={locationLoading ? <PulseLoader size='10px'/> : 'Use GPS Location'}
                        disabled={locationLoading} onClick={() => requestGeoLocation()}/>
                <Button margin={{vertical: 'small'}} icon={<Search/>} label='View' onClick={() => {
                    if (value && value.trim() !== '') {
                        if (Object.values(props.countries).flatMap(c => {
                            let array = c.regions.map(r => r + ", " + c.country_name);
                            array.push(c.country_name);
                            return array;
                        }).filter((c) => c === value.trim()).length > 0) {
                            history.push("/search/" + value.trim());
                        } else {
                            setError(true);
                        }
                    }
                }} primary/>
            </Box>
            {
                geolocationRegions.length > 0 && (
                    <Box wrap direction='row' align='center' justify='between'>
                        {
                            geolocationRegions.map((region) => (
                                <Button margin={{vertical: 'small'}} icon={<Waypoint/>} label={region.display_name} onClick={() => {
                                    if (region.subregion2) {
                                        history.push("/search/" + region.subregion2 + ", " + region.subregion1 + ", " + region.country_name);
                                    } else if (region.subregion1) {
                                        history.push("/search/" + region.subregion1 + ", " + region.country_name);
                                    } else {
                                        history.push("/search/" + region.country_name);
                                    }
                                }}/>
                            ))
                        }
                    </Box>
                )
            }
            {
                props.config && props.config.suggested_regions && (
                    <Box wrap direction='row' align='center' justify='between'>
                        <Heading level={3}>Based on your IP address:</Heading>
                        {
                            props.config.suggested_regions.map((region) => (
                                <Button margin={{vertical: 'small'}} icon={<LocationPin/>} label={region.display_name} onClick={() => {
                                    if (region.subregion2) {
                                        history.push("/search/" + region.subregion2 + ", " + region.subregion1 + ", " + region.country_name);
                                    } else if (region.subregion1) {
                                        history.push("/search/" + region.subregion1 + ", " + region.country_name);
                                    } else {
                                        history.push("/search/" + region.country_name);
                                    }
                                }}/>
                            ))
                        }
                    </Box>
                )
            }
        </Box>
    );
}

export default SearchBar;
import React, {useEffect, useState} from "react";
import {Anchor, Box, Button, Heading, MaskedInput} from "grommet";
import {Location, MapLocation, Search} from "grommet-icons";
import * as Fuse from "fuse.js";
import {useHistory} from "react-router-dom";

function SearchBar(props) {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const history = useHistory();

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
                'regions.region_name'
            ]
        };
        let fuse = new Fuse(props.countries, options); // "list" is the item array
        let result = fuse.search(value);
        setOptions(result.flatMap(o => {
            let result = [];
            result.push(o.item.country_name);
            if (o.regions) {
                for (let region in o.regions) {
                    result.push(region.region_name);
                }
            }
            return result;
        }).slice(0, 5));
    }

    return (
        <Box fill='horizontal' justify='end' pad='small' gap='medium'>
            <Anchor label={<Heading margin='none' level='3'>Search</Heading>} icon={<MapLocation/>} href='#'/>
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
            <Box wrap direction='row' align='center' justify='between'>
                {/*<Button icon={<Location/>} label='Locate'/>*/}
                <Button icon={<Search/>} label='View' onClick={() => {
                    history.push("/search/" + value.trim())
                }} primary/>
            </Box>
        </Box>
    );
}

export default SearchBar;
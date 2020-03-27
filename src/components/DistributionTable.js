import React from "react";
import {scaleSymlog} from "d3-scale";
import {Box, Distribution, Heading, Text} from "grommet";
import {Emergency, FingerPrint, Validate} from "grommet-icons";

function DistributionTable(props) {

    const {size, subRegion1} = props;

    if (!(Object.keys(subRegion1).length > 0 && subRegion1.regions.length < 200)) {
        return <></>
    }

    let max = 0;

    let regions = subRegion1.regions.sort((a, b) => b.stats.confirmed - a.stats.confirmed).slice(1, 11).map(region => {
        if (max < region.stats.confirmed) {
            max = region.stats.confirmed;
        }
        return {
            value: region.stats.confirmed,
            deaths: region.stats.deaths,
            recovered: region.stats.recovered,
            name: region.region_name
        };
    });

    const colorScale = scaleSymlog()
        .domain([0, max])
        .range(["#d8ffcc", "#ff5233"]);

    console.log(regions);

    return (
        <Box fill='horizontal' wrap
             margin={{bottom: 'medium'}}
             style={{
                 overflow: 'scroll'
             }}
             round='small'
             pad='none'>
            <Distribution height={{min: size, max: size}} values={regions}>
                {value => (
                    <Box pad='small' round='small' background={colorScale(value.value)} fill align='center'
                         justify='center' gap='xxsmall'>
                        {(
                            size !== 'small' && value.value > max / 16) && (
                            (size === 'large' && value.value > max / 4) ? (
                                <>
                                    <Heading margin='none' level={3} size="large"><FingerPrint/>{value.value}</Heading>
                                    <Heading margin='none' level={3} size="large"><Emergency/>{value.deaths}</Heading>
                                    <Heading margin='none' level={3} size="large"><Validate/>{value.recovered}</Heading>
                                </>
                            ) : (
                                <Text margin='none' weight='bold' size={size}>{value.value}</Text>
                            ))
                        }
                        <Box>
                            <Text truncate>{value.name}</Text>
                        </Box>
                    </Box>
                )}
            </Distribution>
        </Box>
    );
}

export default DistributionTable;
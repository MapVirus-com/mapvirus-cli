import {Table, TableBody, TableCell, TableHeader, TableRow, Text} from "grommet";
import React from "react";
import BarContainer from "./BarContainer";

function RegionTable(props) {

    const {size, subRegion1} = props;

    if (!(Object.keys(subRegion1).length > 0 && subRegion1.regions.length < 200)) {
        return <></>
    }

    return (
        <BarContainer fill='horizontal' wrap
                      background='neutral-3'
                      margin={{bottom: 'medium'}}
                      style={{
                          overflow: 'scroll'
                      }}
                      align='start'
                      height={size}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell scope="col" border="bottom">
                            Name
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Confirmed
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Deaths
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                            Recovered
                        </TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        subRegion1.regions.slice(0, 200).map((region) => (
                            <TableRow>
                                <TableCell scope="row">
                                    {
                                        region.subregion2 ?
                                            <Text>{region.region_name}</Text> :
                                            <Text weight='bold' style={{ textDecorationLine: 'underline' }}>{region.region_name}</Text>
                                    }
                                </TableCell>
                                <TableCell>{region.stats.confirmed}</TableCell>
                                <TableCell>{region.stats.deaths}</TableCell>
                                <TableCell>{region.stats.recovered}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </BarContainer>
    );
}

export default RegionTable;
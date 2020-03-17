import React, {memo, useEffect, useState} from "react";
import {csv} from "d3-fetch";
import {scaleLinear} from "d3-scale";
import {ComposableMap, Geographies, Geography, Graticule, ZoomableGroup} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import Color from "color";
import {Heading, Text} from "grommet";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const dataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-15-2020.csv";

const colorScale = scaleLinear()
    .domain([0, 10000])
    .range(["#ffedea", "#ff5233"]);

function Map(props) {
    const [data, setData] = useState([]);
    const [tooltip, setTooltip] = useState('');

    useEffect(() => {
        csv(dataUrl).then(data => {
            setData(data);
        });
    }, []);

    return (
        <>
            <ReactTooltip>{tooltip}</ReactTooltip>
            <ComposableMap data-tip="" data-html="true" projection='geoMercator'>
                <ZoomableGroup zoom={1}>
                    <Graticule stroke="#ffedea"/>
                    {data.length > 0 && (
                        <Geographies geography={geoUrl}>
                            {({geographies}) =>
                                geographies.map(geo => {
                                    const d = data.find(s => s["Country/Region"] === geo.properties.NAME);
                                    const confirmed = d == null ? 0 : d["Confirmed"];
                                    const deaths = d == null ? 0 : d["Deaths"];
                                    const recovered = d == null ? 0 : d["Recovered"];
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={d ? colorScale(confirmed) : "#F5F4F6"}
                                            stroke="#D6D6DA"
                                            onMouseEnter={() => {
                                                const { NAME } = geo.properties;
                                                setTooltip(`${NAME}<br/>Confirmed ${confirmed}<br/>Deaths ${deaths}<br/>Recovered ${recovered}`);
                                                props.setInfoBox([NAME, confirmed, deaths, recovered]);
                                            }}
                                            onMouseLeave={() => {
                                                setTooltip("");
                                            }}
                                            style={{
                                                default: {
                                                    outline: "none"
                                                },
                                                hover: {
                                                    fill: Color(colorScale(confirmed)).darken(0.25).hex(),
                                                    outline: "none"
                                                },
                                                pressed: {
                                                    fill: Color(colorScale(confirmed)).darken(0.5).hex(),
                                                    outline: "none"
                                                }
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    )}
                </ZoomableGroup>
            </ComposableMap>
        </>
    );
}

export default memo(Map);
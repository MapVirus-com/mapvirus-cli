import React, {memo, useEffect, useState} from "react";
import {scaleLinear} from "d3-scale";
import {ComposableMap, Geographies, Geography, Graticule, ZoomableGroup} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import Color from "color";
import {useHistory} from 'react-router-dom';
import {API_ROOT} from "./Constants";
import {PatternLines} from "@vx/pattern";
import {isBrowser} from "react-device-detect";

const geoUrl = "/world-110m.json";
// const dataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-15-2020.csv";

const colorScale = scaleLinear()
    .domain([0, 10000])
    .range(["#ffedea", "#ff5233"]);

function StyledComposableMap(props) {

    const history = useHistory();

    return (
        <ComposableMap data-tip="" data-html="true" projection='geoMercator'>
            <PatternLines
                id="lines"
                height={6}
                width={6}
                stroke="#776865"
                strokeWidth={1}
                background="#F6F0E9"
                orientation={["diagonal"]}
            />
            <ZoomableGroup zoom={1}>
                <Graticule stroke="#ffedea"/>
                {props.countries.length > 0 && (
                    <>
                        <Geographies geography={geoUrl}>
                            {({geographies}) =>
                                geographies.map(geo => {
                                    const d = props.countries.find(s => s["country_iso_a3"] === geo.properties.ISO_A3);
                                    const confirmed = d == null ? 0 : d['stats']["confirmed"];
                                    const deaths = d == null ? 0 : d['stats']["deaths"];
                                    const recovered = d == null ? 0 : d['stats']["recovered"];
                                    const {NAME} = geo.properties;
                                    return isBrowser ? (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={props.mapSelection === NAME ? "url('#lines')" : (d ? colorScale(confirmed) : "#F5F4F6")}
                                            stroke={"#D6D6DA"}
                                            strokeWidth={props.mapSelection === NAME ? 2 : 1}
                                            onMouseEnter={() => {
                                                props.setTooltip(`${NAME}<br/>Confirmed ${confirmed}<br/>Deaths ${deaths}<br/>Recovered ${recovered}`);
                                                props.setInfoBox([NAME, confirmed, deaths, recovered]);
                                            }}
                                            onMouseLeave={() => {
                                                props.setTooltip("");
                                                props.setInfoBox([]);
                                            }}
                                            onClick={() => {
                                                history.push("/search/" + NAME);
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
                                        />) : (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={props.mapSelection === NAME ? "url('#lines')" : (d ? colorScale(confirmed) : "#F5F4F6")}
                                            stroke={"#D6D6DA"}
                                            strokeWidth={props.mapSelection === NAME ? 2 : 1}
                                            style={{
                                                default: {
                                                    outline: "none"
                                                }
                                            }}
                                        />);
                                })
                            }
                        </Geographies>
                    </>
                )}
            </ZoomableGroup>
        </ComposableMap>
    );
}

function Map(props) {
    const [tooltip, setTooltip] = useState('');

    useEffect(() => {
        fetch(API_ROOT + "/country", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then((json) => {
                props.setCountries(json.countries);
            }, (error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {props.size !== 'small' && (<ReactTooltip>{tooltip}</ReactTooltip>)}
            <StyledComposableMap setTooltip={setTooltip} {...props}/>
        </>
    );
}

export default memo(Map);
import React, {memo, useEffect, useState} from "react";
import {scaleLinear} from "d3-scale";
import {ComposableMap, Geographies, Geography, Graticule, ZoomableGroup} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import Color from "color";
import {useHistory} from 'react-router-dom';
import {API_ROOT} from "./Constants";

const geoUrl = "/world-110m.json";
// const dataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-15-2020.csv";

const colorScale = scaleLinear()
    .domain([0, 10000])
    .range(["#ffedea", "#ff5233"]);

function Map(props) {
    const [tooltip, setTooltip] = useState('');
    const history = useHistory();

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
            <ReactTooltip>{tooltip}</ReactTooltip>
            <ComposableMap data-tip="" data-html="true" projection='geoMercator'>
                <ZoomableGroup zoom={1}>
                    <Graticule stroke="#ffedea"/>
                    {props.countries.length > 0 && (
                        <Geographies geography={geoUrl}>
                            {({geographies}) =>
                                geographies.map(geo => {
                                    const d = props.countries.find(s => s["country_iso_a3"] === geo.properties.ISO_A3);
                                    const data_country_name = d == null ? "" : d['country_name'];
                                    const confirmed = d == null ? 0 : d['stats']["confirmed"];
                                    const deaths = d == null ? 0 : d['stats']["deaths"];
                                    const recovered = d == null ? 0 : d['stats']["recovered"];
                                    const {NAME} = geo.properties;
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={d ? colorScale(confirmed) : "#F5F4F6"}
                                            stroke={ props.mapSelection === NAME ? "#3D138D" : "#D6D6DA"}
                                            strokeWidth={props.mapSelection === NAME ? 2 : 1}
                                            onMouseEnter={() => {
                                                setTooltip(`${NAME}<br/>Confirmed ${confirmed}<br/>Deaths ${deaths}<br/>Recovered ${recovered}`);
                                                props.setInfoBox([NAME, confirmed, deaths, recovered]);
                                            }}
                                            onMouseLeave={() => {
                                                setTooltip("");
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
import React, {memo, useEffect, useState} from "react";
import {scaleSymlog} from "d3-scale";
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import Color from "color";
import {useHistory} from 'react-router-dom';
import {PatternLines} from "@vx/pattern";
import {isBrowser} from "react-device-detect";
import {geoAlbersUsa, geoPath} from "d3-geo";
import {Text} from "grommet";

const geoUrl = "/geojson/world-110m.json";
// const dataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-15-2020.csv";

const colorScale = scaleSymlog()
    .domain([0, 10000])
    .range(["#ffedea", "#ff5233"]);

const colorScaleRegion = scaleSymlog()
    .domain([0, 500])
    .range(["#ffedea", "#ff5233"]);

function WorldComposableMap(props) {
    const history = useHistory();

    if (Object.keys(props.countries).length === 0) {
        return <Text>Loading...</Text>
    }

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
                {Object.keys(props.countries).length > 0 && (
                    <>
                        <Geographies geography={geoUrl}>
                            {({geographies}) =>
                                geographies.map(geo => {
                                    const {NAME, ISO_A3} = geo.properties;
                                    const d = props.countries.find(s => s["country_iso_a3"] === ISO_A3);

                                    const {confirmed, deaths, recovered} = d ? d['stats'] : {
                                        confirmed: "No Data",
                                        deaths: "No Data",
                                        recovered: "No Data"
                                    };
                                    const country_name = d ? d['country_name'] : NAME;
                                    return isBrowser ? (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={props.mapSelection === ISO_A3 ? "url('#lines')" : (d ? colorScale(confirmed) : "#F5F4F6")}
                                            stroke={"#D6D6DA"}
                                            strokeWidth={props.mapSelection === ISO_A3 ? 2 : 1}
                                            onMouseEnter={() => {
                                                props.setTooltip(`${NAME}<br/>Confirmed ${confirmed}<br/>Deaths ${deaths}<br/>Recovered ${recovered}`);
                                                props.setInfoBox([NAME, confirmed, deaths, recovered]);
                                            }}
                                            onMouseLeave={() => {
                                                props.setTooltip("");
                                                props.setInfoBox([]);
                                            }}
                                            onClick={() => {
                                                history.push("/search/" + country_name);
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
                                            fill={props.mapSelection === ISO_A3 ? "url('#lines')" : (d ? colorScale(confirmed) : "#F5F4F6")}
                                            stroke={"#D6D6DA"}
                                            strokeWidth={props.mapSelection === ISO_A3 ? 2 : 1}
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

function CountryComposableMap(props) {
    const geojsonUrl = props.subRegion1.geojson_url;
    console.log("Rendering...");

    const projection = geoAlbersUsa();

    function calc(geography) {
        let centroids = [];
        let minX = [];
        let maxX = [];
        let minY = [];
        let maxY = [];
        geography.forEach(geo => {
            const path = geoPath().projection(projection);
            const centroid = projection.invert(path.centroid(geo));
            const bounds = path.bounds(geo);
            maxX.push(bounds[1][0]);
            minX.push(bounds[0][0]);
            maxY.push(bounds[1][1]);
            minY.push(bounds[0][1]);
            centroids.push(centroid);
        });
        let latitudes = centroids.map(r => r[1]);
        let latitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;

        let longitudes = centroids.map(r => r[0]);
        let longitude = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

        const centroid = [longitude, latitude];
        setCenter(centroid);

        let dx = Math.max(...maxX) - Math.min(...minX);
        let dy = Math.max(...maxY) - Math.min(...minY);

        const zoom = 0.9 / Math.max(dx / 600, dy / 600);
        setZoom(zoom);
    }

    const [center, setCenter] = useState([-96, 38]);
    const [zoom, setZoom] = useState(1);
    const [geoG, setGeoG] = useState();
    useEffect(() => {
        if (geoG) {
            calc(geoG);
        }
    }, [geoG]);

    return (
        <ComposableMap data-tip="" data-html="true" projection={geoAlbersUsa()}>
            <ZoomableGroup zoom={zoom} center={center}>
                <Geographies geography={geojsonUrl}>
                    {({geographies, proj}) => {
                        let geos = [];
                        const result = geographies.map(geo => {
                            const region = props.subRegion1.regions.find(r => r.id === geo.id);

                            if (!region) {
                                return null
                            }

                            if (!geoG) {
                                geos.push(geo);
                            }
                            return (
                                <RegionGeography key={geo.rsmKey} geo={geo}
                                                 proj={proj} region={region} {...props}/>
                            );
                        });
                        if (!geoG) {
                            setGeoG(geos); // warning given
                        }
                        return result;
                    }}
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    );
}

function RegionGeography(props) {
    const history = useHistory();
    const {geo, proj, region} = props;
    const {confirmed, deaths, recovered} = region ? region.stats : 0;
    const country_name = props.subRegion1 ? props.subRegion1.country_name : null;
    const {subregion1} = region ? region : null;

    return isBrowser ? (
        <Geography
            key={geo.rsmKey}
            geography={geo}
            projection={proj}
            fill={colorScaleRegion(confirmed)}
            onMouseEnter={() => {
                props.setInfoBox([region.region_name, confirmed, deaths, recovered]);
            }}
            onMouseLeave={() => {
                props.setTooltip("");
                props.setInfoBox([]);
            }}
            style={{
                default: {
                    outline: "none"
                },
                hover: {
                    fill: Color(colorScale(confirmed)).darken(0.25).hex(),
                    outline: "none"
                }
            }}
            onClick={() => {
                if (subregion1) {
                    history.push("/search/" + region.subregion1 + ", " + country_name);
                }
            }}
        />) : (
        <Geography
            key={geo.rsmKey}
            geography={geo}
            projection={proj}
            fill={colorScaleRegion(confirmed)}
        />);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Map(props) {
    const [tooltip, setTooltip] = useState('');

    return (
        <>
            {props.size !== 'small' && (<ReactTooltip>{tooltip}</ReactTooltip>)}
            {
                !props.fetchingRegion ?
                    Object.keys(props.subRegion1).length === 0 ?
                        <WorldComposableMap setTooltip={setTooltip} {...props}/> :
                        <CountryComposableMap size={props.size} setTooltip={setTooltip} subRegion1={props.subRegion1}
                                              setInfoBox={props.setInfoBox} infoBox={props.infoBox}
                        />
                    :
                    <Text>Loading...</Text>
            }

        </>
    );
}

export default memo(Map);
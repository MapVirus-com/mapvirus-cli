import React from "react";
import {Helmet} from "react-helmet";
import AppBar from "../components/AppBar";
import BarContainer from "../components/BarContainer";
import CDCNotice from "../components/CDCNotice";

export default function COVID19(props) {
    return (
        <>
            <Helmet>
                <title>What is COVID-19 - MapVirus - A Coronavirus Tracker</title>

                <meta name="keywords"
                      content="covid-19, coronavirus, symptoms, info, corona, virus, map, tracking, statistics, prevention"/>
                <meta name="description"
                      content="Overview and symptoms of Novel Coronavirus (COVID-19)."/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://mapvirus.com/covid19"/>
                <meta name="og:title" property="og:title"
                      content="What is COVID-19 - MapVirus - A Coronavirus Tracker"/>
                <meta name="og:description" property="og:description"
                      content="Overview and symptoms of Novel Coronavirus (COVID-19)."/>
            </Helmet>

            <AppBar size={props.size}/>

            <BarContainer
                background='status-critical'
                margin={{bottom: 'medium'}}
                round='small'
            >
                <CDCNotice/>
            </BarContainer>
        </>
    );
};
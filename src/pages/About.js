import React from "react";
import {Helmet} from "react-helmet";
import CDCNotice from "../components/CDCNotice";
import BarContainer from "../components/BarContainer";
import AppBar from "../components/AppBar";
import {Anchor, Box, Heading, Text} from "grommet";
import AppFooter from "../components/AppFooter";
import {Gremlin, Halt, StatusInfo} from "grommet-icons";

export default function Prevention(props) {

    const size = props.size;

    function Row(props) {
        return (
            <Box direction={size === 'small' ? 'column' : 'row'} margin={{'vertical': 'small'}} align='center'
                 gap='large' width='large'>
                {props.icon}
                <Box gap='small' width='large'>
                    {props.children}
                </Box>
            </Box>
        );
    }

    return (
        <>
            <Helmet>
                <title>About - MapVirus - A Coronavirus Tracker</title>

                <meta name="keywords"
                      content="about, covid-19, coronavirus, corona, virus, map, tracking, statistics, trends, data, dashboard, information"/>
                <meta name="description"
                      content="Background and story behind MapVirus.com"/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://mapvirus.com/about"/>
                <meta name="og:title" property="og:title"
                      content="About - MapVirus - A Coronavirus Tracker"/>
                <meta name="og:description" property="og:description"
                      content="Background and story behind MapVirus.com."/>
            </Helmet>

            <AppBar size={props.size}/>

            <BarContainer
                background='status-critical'
                margin={{bottom: 'medium'}}
                round='small'
            >
                <CDCNotice/>
            </BarContainer>

            <BarContainer
                border={{
                    color: 'neutral-3',
                    size: 'medium',
                    style: 'groove'
                }}
                margin={{bottom: 'medium'}}
                round='small'
                align='center'
                justify='start'
                direction='column'
                pad='medium'
            >

                <Box fill='horizontal'>
                    <Anchor label={<Heading margin='none' level='3'>About</Heading>} icon={<Halt/>}
                            href='/about'/>
                </Box>

                <Row>
                    <Box direction='row' align='center' gap='small'>
                        <Gremlin/>
                        <Heading level='3' margin='none'>About Me</Heading>
                    </Box>
                    <Text wordBreak="break-word">
                        Hey, this is Steven. I have a passion for computer science and coding, and I'm currently a high
                        school junior at Phillips Exeter Academy.
                    </Text>
                    <Text wordBreak="break-word">
                        Frustrated by the disorganization of information on COVID-19, I created this site to bring
                        together relevant and localized information from reputable sources to communities. Sheets of
                        numbers easily overwhelm people, and I hope, through the visualization of data, trends taking
                        place in communities are made noticeable and comprehensible.
                    </Text>
                </Row>

                <Row>
                    <Box direction='row' align='center' gap='small'>
                        <StatusInfo/>
                        <Heading level='3' margin='none'>Sources</Heading>
                    </Box>
                    <Text wordBreak="break-word">
                        MapVirus.com crawls data periodically from multiple sources, including CDC of various
                        governments, research institutes, and reputable media sources, whose data do not always agree
                        despite our best effort to reconcile the discrepancies. Therefore, we make no
                        grantee on the accuracy of information displayed on this website. Please read more in the
                        disclaimer section.
                    </Text>
                    <Box>
                        <Anchor label='JHU CSSE' href='https://github.com/CSSEGISandData/COVID-19'/>
                        <Anchor label='CDC' href='https://www.cdc.gov/coronavirus/2019-ncov/index.html'/>
                        <Anchor label='WHO' href='https://www.who.int/'/>
                        <Anchor label='New York Times'
                                href='https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html'/>
                        <Anchor label='NY CDC'
                                href='https://coronavirus.health.ny.gov/county-county-breakdown-positive-cases'/>
                        <Anchor label='WA CDC' href='https://www.doh.wa.gov/Emergencies/Coronavirus'/>
                        <Anchor label='MI CDC' href='https://www.michigan.gov/coronavirus'/>
                        <Anchor label='Gov.uk'
                                href='https://www.gov.uk/government/collections/coronavirus-covid-19-list-of-guidance'/>
                    </Box>
                </Row>

            </BarContainer>

            <AppFooter setOverlay={props.setOverlay}/>
            {props.overlay}
        </>
    )
};
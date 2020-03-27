import React from "react";
import {Helmet} from "react-helmet";
import CDCNotice from "../components/CDCNotice";
import BarContainer from "../components/BarContainer";
import AppBar from "../components/AppBar";
import {Anchor, Box, Heading, Image, Text} from "grommet";
import AppFooter from "../components/AppFooter";
import {Halt} from "grommet-icons";

import WashingHands from '../images/washing_hands.svg';
import Fever from '../images/fever.svg';
import Cough from '../images/virus_transmission.svg';
import Crowd from '../images/crowd.svg';
import Warning from '../images/virus_warning.svg';

export default function Prevention(props) {

    const size = props.size;

    function Row(props) {
        return (
            <Box direction={size === 'small' ? 'column' : 'row'} align='center' gap='large' width='large'>
                <Box width={size === 'small' ? 'small' : 'medium'}  height={size === 'small' ? 'small' : 'medium'}>
                    <Image fit='contain' src={props.icon}/>
                </Box>
                <Box gap='small' width='large'>
                    {props.children}
                </Box>
            </Box>
        );
    }

    return (
        <>
            <Helmet>
                <title>Prevention - MapVirus - A Coronavirus Tracker</title>

                <meta name="keywords"
                      content="covid-19, coronavirus, prevention, protection, corona, virus, map, tracking, statistics, trends, data, dashboard, information"/>
                <meta name="description"
                      content="Comprehensive information compiled from authoritative sources on how to protect yourself against Coronavirus."/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://mapvirus.com/prevention"/>
                <meta name="og:title" property="og:title"
                      content="Prevention - MapVirus - A Coronavirus Tracker"/>
                <meta name="og:description" property="og:description"
                      content="Comprehensive information compiled from authoratative sources on how to protect yourself against Coronavirus."/>
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
                    <Anchor label={<Heading margin='none' level='3'>Prevention</Heading>} icon={<Halt/>}
                            href='/prevention'/>
                </Box>

                <Row icon={WashingHands}>
                    <Heading level='2' margin='none'>HANDS: Wash them often</Heading>
                    <Text wordBreak="break-word">
                        <Text weight='bold'>Wash your hands</Text> often with soap and water for at least 20 seconds especially after you have
                        been in a public place, or after blowing your nose, coughing, or sneezing.
                    </Text>
                    <Text wordBreak="break-word">
                        If soap and water are not readily available, <Text weight='bold'>use a hand sanitizer that contains at least 60%
                        alcohol.</Text> Cover all surfaces of your hands and rub them together until they feel dry.
                    </Text>
                </Row>

                <Row icon={Cough}>
                    <Heading level='2' margin='none'>ELBOW: Cough into it</Heading>
                    <Text wordBreak="break-word">
                        <Text weight='bold'>Cover your mouth and nose</Text> with a tissue when you cough or sneeze or use the inside of your
                        elbow.
                    </Text>
                    <Text wordBreak="break-word">
                        <Text weight='bold'>Throw used tissues</Text> in the trash.
                    </Text>
                    <Text wordBreak="break-word">
                        Immediately <Text weight='bold'>wash your hands with soap and water for at least 20 seconds.</Text> If soap and water
                        are not readily available, clean your hands with a hand sanitizer that contains at least 60%
                        alcohol.
                    </Text>
                </Row>

                <Row icon={Warning}>
                    <Heading level='2' margin='none'>FACE: Don't touch it</Heading>
                    <Text wordBreak="break-word">
                        <Text weight='bold'>Avoid touching your eyes, nose, and mouth</Text> with unwashed hands.
                    </Text>
                </Row>

                <Row icon={Crowd}>
                    <Heading level='2' margin='none'>FEET: Stay more than 3ft apart</Heading>
                    <Text wordBreak="break-word">
                        <Text weight='bold'>Avoid close contact</Text> with people who are sick
                    </Text>
                    <Text wordBreak="break-word">
                        Put <Text weight='bold'>distance between yourself and other people</Text> if COVID-19 is spreading in your community.
                    </Text>
                </Row>

                <Row icon={Fever}>
                    <Heading level='2' margin='none'>FEEL sick? Stay home</Heading>
                    <Text wordBreak="break-word">
                        <Text weight='bold'>Stay home</Text> if you are sick, except to get medical care.
                    </Text>
                    <Text wordBreak="break-word">
                        <Text weight='bold'>IF YOU ARE SICK</Text>: You should wear a facemask when you are around other people (e.g., sharing
                        a room or vehicle) and before you enter a healthcare provider’s office.
                    </Text>
                    <Text wordBreak="break-word">
                        <Text weight='bold'>Clean AND disinfect</Text> frequently touched surfaces daily. This includes tables, doorknobs,
                        light switches, countertops, handles, desks, phones, keyboards, toilets, faucets, and sinks.
                    </Text>
                </Row>

            </BarContainer>

            <AppFooter setOverlay={props.setOverlay}/>
            {props.overlay}
        </>
    )
};
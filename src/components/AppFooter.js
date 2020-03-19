import {Anchor, Box, Footer, Text} from "grommet";
import ReactGA from "react-ga";
import Disclaimer from "./overlay/Disclaimer";
import React from "react";
import Sources from "./overlay/Sources";

export default function AppFooter(props) {
    return (
        <Footer margin={{bottom: 'medium'}} background="brand" pad="medium" round='small'>
            <Text>© 2020 MapVirus.com</Text>
            {/*<SocialShare/>*/}
            <Box direction='row' gap='small' align='center'>
                <Anchor label="Sources" onClick={() => {
                    if (process.env.REACT_APP_GA_TRACKING_ID) {
                        ReactGA.event({
                            category: "click",
                            action: "sources",
                        });
                    }
                    props.setOverlay(<Sources setOverlay={props.setOverlay}/>);
                }}/>
                <Anchor label="Disclaimer" onClick={() => {
                    if (process.env.REACT_APP_GA_TRACKING_ID) {
                        ReactGA.event({
                            category: "click",
                            action: "disclaimer",
                        });
                    }
                    props.setOverlay(<Disclaimer setOverlay={props.setOverlay}/>);
                }}/>
            </Box>
        </Footer>
    );
}
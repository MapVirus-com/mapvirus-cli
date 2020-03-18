import React from "react";
import {Box, Button, Heading, Layer, Markdown, Text} from "grommet";
import {FormClose} from "grommet-icons";

function Disclaimer(props) {
    return (
        <Layer>
            <Box
                background='light-3'
                tag='header'
                justify='end'
                align='center'
                direction='row'
            >
                <Button
                    icon={<FormClose/>}
                    onClick={() => props.setOverlay(null)}
                />
            </Box>
            <Box flex width="large" height="large" align='center' justify='center' overflow='auto'>
                <Box margin="medium">
                    <Heading level='3'>Disclaimer</Heading>
                    <Text>Last updated: February 01, 2020</Text>

                    <Heading level='4'>WEBSITE DISCLAIMER</Heading>

                    <Text>The information provided by MapVirus.com (“we,” “us” or “our”) on mapvirus.com (the “Site”)
                        and
                        our mobile application is for general informational purposes only. All information on the Site
                        and our mobile application is provided in good faith, however we make no representation or
                        warranty of any kind, express or implied, regarding the accuracy, adequacy, validity,
                        reliability, availability or completeness of any information on the Site or our mobile
                        application. UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF
                        ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR OUR MOBILE APPLICATION OR RELIANCE ON
                        ANY INFORMATION PROVIDED ON THE SITE AND OUR MOBILE APPLICATION. YOUR USE OF THE SITE AND OUR
                        MOBILE APPLICATION AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE AND OUR MOBILE APPLICATION
                        IS SOLELY AT YOUR OWN RISK.</Text>

                    <Heading level='4'>EXTERNAL LINKS DISCLAIMER</Heading>

                    <Text>The Site and our mobile application may contain (or you may be sent through the Site or our
                        mobile application) links to other websites or content belonging to or originating from third
                        parties or links to websites and features in banners or other advertising. Such external links
                        are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability,
                        availability or completeness by us. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
                        RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY
                        WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER
                        ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY
                        TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.</Text>

                    <Heading level='4'>PROFESSIONAL DISCLAIMER </Heading>

                    <Text>The Site cannot and does not contain medical/health advice. The medical/health information is
                        provided for general informational and educational purposes only and is not a substitute for
                        professional advice. Accordingly, before taking any actions based upon such information, we
                        encourage you to consult with the appropriate professionals. We do not provide any kind of
                        medical/health advice. THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THIS SITE OR OUR
                        MOBILE APPLICATION IS SOLELY AT YOUR OWN RISK.</Text>
                </Box>
            </Box>
        </Layer>
    );
}

export default Disclaimer;
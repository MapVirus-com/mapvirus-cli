import {MailOption} from "grommet-icons";
import {EmailShareButton} from "react-share";
import React from "react";

function SocialShare(props) {
    return (
        <>
            <EmailShareButton><MailOption/></EmailShareButton>
        </>
    );
}

export default SocialShare;
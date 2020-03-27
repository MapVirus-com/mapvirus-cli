import {Box, Button, Collapsible, Layer} from "grommet";
import Sidebar from "./Sidebar";
import {FormClose} from "grommet-icons";
import React from "react";

function SidebarWrapper(props) {
    return !props.showSidebar || (props.size !== 'small' && props.size !== 'medium') ? (
        <Collapsible direction="horizontal" open={props.showSidebar}>
            <Box
                flex
                width='medium'
                elevation='small'
                align='center'
                justify='center'
                round='small'
                border={{
                    size: 'medium',
                    color: 'accent-4'
                }}
                pad='small'
            >
                <Sidebar/>
            </Box>
        </Collapsible>
    ) : (
        <Layer>
            <Box
                background='light-3'
                justify='end'
                align='center'
                direction='row'
            >
                <Button
                    icon={<FormClose/>}
                    onClick={() => props.setShowSidebar(false)}
                />
            </Box>
            <Box
                fill
                background='light-2'
                align='center'
                justify='center'
            >
                <Sidebar/>
            </Box>
        </Layer>
    )
}

export default SidebarWrapper;
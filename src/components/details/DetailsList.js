import React from 'react';
import {List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

function DetailsList({props}) {
    return (
        <>
        <Typography variant="h6" sx={{marginTop: "10px"}}>{props.name}</Typography>
        <List sx={{width: '100%', maxHeight: 250, display: 'flex', flexFlow: 'column wrap', overflow: 'scroll'}}>
            {props.data.map((data, index) => (
                <ListItem sx={{width: 'auto'}} key={index}>
                    <ListItemIcon>
                        <CircleIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText
                        primary={data}
                    />
                </ListItem>
            ))}
        </List>
        </>
)

}

export default DetailsList;
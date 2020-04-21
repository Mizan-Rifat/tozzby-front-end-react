import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#F5F5F5',
        position:'relative'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    textClass: {
        fontSize: '16px'
    },
    listItem:{
        borderBottom:'1px solid rgba(0,0,0,.125) !important',
        padding : '.5rem 1.25rem',
        color:'#666666',
        cursor:'default'
    },
    list:{
        '&:hover':{
            color:'red',
            transform:'translateX(10px)',
            transition:'.5s'
        }
    }
}));

export default function NestedList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" style={{ background: '#FD511F' }}>
                    All Categories
        </ListSubheader>
            }
            className={classes.root}
        >

            <div className={`${classes.listItem} list-group-item `}> 
                <div className={`${classes.list} d-flex`}>
                    <SendIcon fontSize='inherit' className='mr-2 mt-1'/>
                    <p style={{margin:0}}>Fashion</p>
                </div>
            </div>
            <div className={`${classes.listItem} list-group-item `}> 
                <div className={`${classes.list} d-flex`}>
                    <SendIcon fontSize='inherit' className='mr-2 mt-1'/>
                    <p style={{margin:0}}>Fashion</p>
                </div>
            </div>
            <div className={`${classes.listItem} list-group-item `}> 
                <div className={`${classes.list} d-flex`}>
                    <SendIcon fontSize='inherit' className='mr-2 mt-1'/>
                    <p style={{margin:0}}>Fashion</p>
                </div>
            </div>
            <div className={`${classes.listItem} list-group-item `}> 
                <div className={`${classes.list} d-flex`}>
                    <SendIcon fontSize='inherit' className='mr-2 mt-1'/>
                    <p style={{margin:0}}>Fashion</p>
                </div>
            </div>
            

          

        </List>
    );
}


function Menu(){

    return(
        <div className="" style={{
            height:'200px',
            width:'200px',
            background:'red',
            left:'145px',
            top:'48px',
            position:'absolute',
            // transform:
        }}></div>
    )
}
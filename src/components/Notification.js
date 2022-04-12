import { Snackbar } from '@material-ui/core';
import React from 'react'
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root:{
        top:theme.spacing(9),

    }
}))

export default function Notification(props) {

    const classes = useStyles();

    const {notify, setNotify} = props;

    const handleClose = (event, reason) => {
        if( reason === 'clickaway'){
            return
        }
        setNotify({
            ...notify,
            isOpen:false,
        })
    }

    return (
        <Snackbar
        className={classes.root}
        open={notify.isOpen}
        autoHideDuration={3000}
        anchorOrigin={{vertical:'top', horizontal:'right'}}
        onClose={handleClose}
        >
            <Alert
            severity={notify.type}
            onClose={handleClose}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

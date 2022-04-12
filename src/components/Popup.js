import { Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import React from 'react'
import { Controls } from './controls/Controls'
import  CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  diaglogWrapper:{
    padding:theme.spacing(2),
    position:'absolute',
    top:theme.spacing(5),
    // backgroundColor:'green',
  },
  DialogTitle:{
    paddingRight:'0px',
  }
}))

export default function Popup(props) {
    // openPopup is a state variable
    // children containts all the element inside popup i.e all the children components inside popup
    const {title, children, openPopup, setOpenPopup} = props;
    const classes = useStyles();
  return (
    <Dialog open={openPopup} maxWidth="md" classes={{paper:classes.diaglogWrapper}}>
        <DialogTitle className={classes.DialogTitle}>
            <div style={{display:'flex'}}>
              <Typography variant="h6" component="div" style={{flexGrow:1}}>
                {title}
              </Typography>
              <Controls.ActionButton
                color="secondary"
                onClick={() => {setOpenPopup(false)}}
              >
                <CloseIcon />
              </Controls.ActionButton>
            </div>
        </DialogTitle>
        <DialogContent dividers>
            {children}
        </DialogContent>
    </Dialog>
  )
}

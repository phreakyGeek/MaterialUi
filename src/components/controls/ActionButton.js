import { makeStyles, Button } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles(theme => ({
    root:{
        minWidth:'0px',
        margin:theme.spacing(0.5),
    },
    primary:{
      backgroundColor:theme.palette.primary.light,
      '& .MuiButton-label':{
        color:theme.palette.primary.main,
      }
    },
    secondary:{
        backgroundColor:theme.palette.secondary.light,
        '& .MuiButton-label':{
          color: theme.palette.secondary.main,
        }
    }
}))

export default function ActionButton(props) {

    const {color, children, onClick} = props;

    const classes = useStyles();
    
  return (
    <Button
    className={`${classes.root} ${classes[color]}`}
    onClick={onClick}
    >
        {children}
    </Button>
  )
}

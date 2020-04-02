import { IconButton, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom'

import React from 'react';

const useStyles = makeStyles({
  backBtn: {
    display: 'flex',
    justifyContent: 'start',
    marginTop: '2rem',
    color: 'rgba(0, 0, 0, 0.23)'
  },
})

function BackBtn(props) {
  let classes = useStyles();
  let history = useHistory();

  return (
    <IconButton className={classes.backBtn} onClick={() => history.goBack()}>
      <ArrowBackIosIcon />
      <Typography variant="button">
        Back
      </Typography>
    </IconButton>
  )
}

export default BackBtn

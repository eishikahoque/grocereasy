import React from 'react'
import Logo from '../../assets/logo.svg'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  logo: {
    width: '90%',
  },
  logoTitle: {
    fontFamily: 'Lato',
    fontSize: '3.5rem',
    fontWeight: '700',
    color: '#92C023',
  }
});


function Conditional() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={Logo} className={classes.logo} alt="" />
      <Typography className={classes.logoTitle}>
        grocereasy
      </Typography>
    </div>
    
  )
}
export default Conditional

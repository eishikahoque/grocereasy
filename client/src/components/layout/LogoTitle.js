import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

const styles = () => ({
  logoTitle: {
    fontFamily: 'Lato',
    fontSize: '3rem',
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#FFD043',
    padding: '2rem',
    paddingBottom: '10rem'
  },
})


class LogoTitle extends Component {
  render() {
  const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.logoTitle}>grocereasy</Typography>
      </div>
    )
  }
}

export default withStyles(styles)(LogoTitle)
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

// import MuiThemeProvider from '@material-ui/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = (theme) => ({
  root: {
    margin: '2rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center'

  },
  textField: {
    margin: '0.75rem auto',
    width: '20%',

  },
  btn: {
    width: '10%',
    padding: '1rem',
    margin: '2rem auto',
  },
});

export class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  
  render() {
    const { classes } = this.props;
    const { values, handleChange } = this.props;
    
    return (
      <div>
        <React.Fragment>

        <form className={classes.root} noValidate autoComplete="on">
            <TextField
              className={classes.textField}
              id="standard-basic"
              label="Name"
              onChange={handleChange('name')}
              defaultValue={values.name}
            />
            <TextField
              className={classes.textField}
              id="standard-basic"
              label="Email"
              onChange={handleChange('email')}
              defaultValue={values.email}
            />
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <TextField
              className={classes.textField}
              id="standard-basic"
              label="Phone Number"
              onChange={handleChange('phoneNumber')}
              defaultValue={values.phoneNumber}
            />
            <Button
              className={classes.btn}
              color="primary"
              variant="contained"
              onClick={this.continue}
            >
              Next
            </Button>

      
        </form>
        </React.Fragment>
      </div>
    )
  }
}

export default withStyles(styles)(FormUserDetails);

import { Button, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Formik } from 'formik';
import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import * as Yup from 'yup';

import BottomNavBar from '../layout/BottomNavBar';
import NavBar from '../layout/NavBar';


const styles = () => ({
  context: {
    margin: '5rem 2rem',
  },
  title: {
    fontFamily: 'Lato',
  }, 
  image: {
    width: '60%',
    display: 'flex',
    margin: '5rem auto',
  },
  subheader: {
    fontWeight: 500
  },
  addBtn: {
    display: 'flex',
    margin: '2rem auto'
  }
})

const accountDetailValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Enter your name'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must contain atleast 8 characters')
    .required('Enter your password'),
  phoneNumber: Yup.string()
    .required('Enter your phone number'),
})

const PhoneTextMask = (props) => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => { inputRef(ref ? ref.inputElement : null); }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      guide={false}
    />
  )
}


class Account extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      showPassword: false,
      phoneNumber: '',
    }
  }

  componentDidMount = () => {

  }
  
  render() {
  const {classes} = this.props

    return (
      <div>
        <NavBar />
        <div className={classes.context}>
          <Typography variant="h4" className={classes.title}>
            My Account
          </Typography>
          <Formik 
            initialValues={
              {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phoneNumber: this.state.phoneNumber,
              }
            }
            enableReinitialize
            validationSchema={accountDetailValidationSchema}
            onSubmit={this.handleSubmit}
          >
            {props => (

              <form className={classes.form} onSubmit={props.handleSubmit}>
                <TextField
                  className={classes.textField}
                  error={props.touched.name && !!props.errors.name}
                  helperText={(props.touched.name && props.errors.name) || ''}
                  label="Name"
                  name="name"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  FormHelperTextProps={{ className: classes.helperText }}
                />
                <TextField
                  className={classes.textField}
                  error={props.touched.email && !!props.errors.email}
                  helperText={(props.touched.email && props.errors.email) || ''}
                  label="Email"
                  name="email"
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  value={props.values.email}
                  FormHelperTextProps={{ className: classes.helperText }}
                />
                <TextField
                  className={classes.textField}
                  error={props.touched.password && !!props.errors.password}
                  helperText={(props.touched.password && props.errors.password) || ''}
                  name="password"
                  label="Password"
                  type={props.values.showPassword ? 'text' : 'password'}
                  value={props.values.password}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  FormHelperTextProps={{ className: classes.helperText }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => props.setFieldValue('showPassword', !props.values.showPassword, false)}
                      >
                        {props.values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }}
                />
                <TextField
                  className={classes.textField}
                  error={props.touched.phoneNumber && !!props.errors.phoneNumber}
                  helperText={(props.touched.phoneNumber && props.errors.phoneNumber) || ''}
                  label="Phone Number"
                  name="phoneNumber"
                  FormHelperTextProps={{ className: classes.helperText }}
                  InputProps={{
                    inputComponent: PhoneTextMask,
                    value: props.values.phoneNumber,
                    onChange: props.handleChange,
                    onBlur: props.handleBlur
                  }}
                />

                <Button variant="contained" color="primary" className={classes.btn} type="submit">
                  Save Changes
                </Button>
              </form>
            )}
          </Formik>
        </div>
        <BottomNavBar />
      </div>
    )
  }
}
export default withStyles(styles)(Account)

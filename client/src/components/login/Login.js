import { Button, Card, CardContent, IconButton, InputAdornment, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import groceryBag from '../../assets/groceryBag.svg';
import LogoTitle from '../layout/LogoTitle';




const styles = () => ({
  root: {
  },
  image: {
    width: '50%',
    margin: '1rem auto',
  },
  card: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    height: '80%',
    borderRadius: '2.75rem 2.75rem 0 0',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateRows: '1fr 0.25fr 1.5fr 0.25fr',
    height: '90%',
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
    overflowX: 'hidden',
  },
  btn: {
    width: '75%',
    margin: '2rem auto',
    fontFamily: 'Raleway'
  },
  title: {
    textAlign: 'center',
    fontSize: '3.5rem',
    margin: 'auto'
  },
  form: {
    margin: '0 2rem',
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginTop: '1rem',
    '& > label + .MuiInput-formControl.Mui-focused': {
      marginTop: '8px'
    }
  }, 
  caption: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textDecoration: 'none',
    color: 'black'
  },
  signupLink: {
    color: '#58C9BE',
    fontWeight: '700',
  }
})

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Enter your password'),
})


class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      showPassword: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this)
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value
    })
  }; 

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  loginUser = () => {
    axios.get('/api/login', {
      baseURL: 'http://localhost:8000',
      auth: {
        username: this.state.email,
        password: this.state.password
      },
    }).then((response) => {
      if (response && response.data && response.status === 200) {
        const { data } = response.data
        sessionStorage.setItem('personalDetail', JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          phoneNumber: data.phone
        }))
        sessionStorage.setItem('addressDetail', JSON.stringify(data.shipping))
        sessionStorage.setItem('allergies', data.allergies)
        sessionStorage.setItem('userId', data._id)

        this.props.history.push('/grocerystores')
      }
    }).catch((err) => console.log(err))
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <LogoTitle />
      <Card className={classes.card}>
        <CardContent className={classes.cardContainer}>
          <img src={groceryBag} className={classes.image} alt="basket" />
          <Typography variant='h1' className={classes.title}>
            Login
          </Typography>
          <Formik
            initialValues={{
              email: this.state.email,
              showPassword: this.state.showPassword,
              password: this.state.password
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
              this.setState({
                ...values
              })
              this.loginUser()
            }}
          >
            {props => (

              <form className={classes.form} onSubmit={props.handleSubmit}>
                <TextField 
                  error={props.touched.email && !!props.errors.email}
                  helperText={(props.touched.email && props.errors.email) || ''}
                  id="standard-basic"
                  label="Email"
                  name="email"
                  className={classes.textField}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
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
                <Button variant="contained" color="primary" className={classes.btn} type="submit">
                  Login
                </Button>
              </form>
            )}
          </Formik>
          <Link className={classes.caption} to="/signup">
            <Typography variant="caption" >
              New to GrocerEasy? <span className={classes.signupLink}>Sign Up</span>
            </Typography>
          </Link>
        </CardContent>
      </Card>
      </div>
    )
  }
}
export default withStyles(styles)(Login)
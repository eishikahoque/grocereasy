import { Card, CardContent, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LogoTitle from '../layout/LogoTitle';
import AddressDetailForm from './AddressDetail';
import PersonalDetailForm from './PersonalDetail';
import PersonalizationForm from './Personalization';


const styles = () => ({
  
  card: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    height: '85%',
    borderRadius: '2.75rem 2.75rem 0 0',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateRows: '1fr 1fr 5fr 1fr',
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
    fontSize: '3rem',
    margin: '0.5rem auto'
  },
  form: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginTop: '1rem',
  }, 
  caption: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textDecoration: 'none',
    color: 'black'
  },
  loginLink: {
    color: '#58C9BE',
    fontWeight: '700',
  },
})

const steps = [
  'Personal Details',
  'Address Details',
  'Preferences'
]

const stepperTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#58C9BE',
      contrastText: '#fff'
    },
  }
});


class Registration extends Component {
  constructor(props){
    super(props)
    this.state = {
      step: 1,
      personalDetail: {
        name: '',
        email: '',
        password: '',
        showPassword: false,
        phoneNumber: '',
      },
      addressDetail: {
        streetNumber: '',
        streetName: '',
        unitNumber: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
        coordinates: {
          latitude: '',
          longitude: ''
        }
      },
      personalization: {
        dietaryPreference: '',
        isSelected: false,
        allergies: [],
      }
    }
    this.handleChange = this.handleChange.bind(this)
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

  handlePersonalDetailComplete = (personalDetail) => {
    this.setState({
      personalDetail,
      step: this.state.step + 1
    })
  }

  handleAddressDetailComplete = (addressDetail) => {
    this.setState({
      addressDetail,
      step: this.state.step + 1
    })
  }

  handlePersonalizationComplete = (personalization) => {
    this.setState({
      personalization
    }, this.navigateNext)
  }

  navigateNext = () => {
    this.props.history.push('/grocerystores', this.state)
  }

  handleFormBack = () => {
    this.setState({
      step: this.state.step - 1
    })
  }
  


  render() {
    const { classes } = this.props;
    return (

      <div className={classes.root}>
        <LogoTitle />
      <Card className={classes.card}>
        <CardContent className={classes.cardContainer}>
          <Typography variant="h2" className={classes.title}>
            Sign Up
          </Typography>

          <ThemeProvider theme={stepperTheme}>
            <Stepper activeStep={this.state.step}>
              {
                steps.map((label) => {
                  return (
                    <Step key={label} >
                      <StepLabel></StepLabel>
                    </Step>
                  )
                })
              }
            </Stepper>
          </ThemeProvider>

          {
            this.state.step === 0 &&
              <PersonalDetailForm personalDetail={this.state.personalDetail} onPersonalDetailChange={this.handlePersonalDetailComplete} />
          }

          {   
            this.state.step === 1 &&
              <AddressDetailForm addressDetail={this.state.addressDetail} onAddressDetailChange={this.handleAddressDetailComplete} onAddressBack={this.handleFormBack} />
          }

          {
            this.state.step === 2 &&
              <PersonalizationForm personalization={this.state.personalization} onPersonalizationChange={this.handlePersonalizationComplete} onPersonalizationBack={this.handleFormBack} />
          }
          

          <Link className={classes.caption} to="/login">
            <Typography variant="caption" >
              Already have an account? <span className={classes.loginLink}>Login</span>
            </Typography>
          </Link>
        </CardContent>
      </Card>
      </div>
    )
  }
}
export default withStyles(styles)(Registration)
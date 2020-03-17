import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';

export class RegisterForm extends Component {

  state= {
    step: 1,
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    addressLineOne: '',

  }  

  // proceed to next step 
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  // go back to previous step 
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  }

  // handle fields change 
  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  }
  
  render() {
    const { step } = this.state;
    const { name, email, password, phoneNumber } = this.state;
    const value = { name, email, password, phoneNumber }
    switch(step) {
      case 1:
        return (
          <FormUserDetails 
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={value}
          />
        )
      case 2:
        return <h1>FormPersonalDetails</h1>
      case 3: 
        return <h1>Confirm</h1>
      case 4: 
        return <h1>Success</h1>
    }
  }
}

export default RegisterForm;

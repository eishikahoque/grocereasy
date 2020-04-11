import { Button, IconButton, InputAdornment, TextField, Typography, FormControl, InputLabel, MenuItem, Select, FormHelperText, Chip , Input} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Formik } from 'formik';
import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import axios from 'axios'

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
  },
  addressRow: {
    display: 'flex',
  },
  leftField: {
    width: '45%',
  },
  rightField: {
    width: '45%',
    marginLeft: 'auto'
  },
  helperText: {
    fontSize: '0.75rem',
    color: '#F4626C',
  },
  formControl: {
    padding: '0.5rem 0',
  },
  btn: {
    display: 'flex',
    margin: '2rem auto',
  },
  postalCode: {
    padding: '0.5rem 0',
  },
  postalCodeInput: {
    textTransform: 'uppercase'
  },
  label: {
    fontSize: '1.5rem',
    margin: '2rem 0 1rem 0',
    textAlign: 'center'
  },
  toggleBtn: {
    border: 'none',
    marginBottom: '1rem',
    '&.MuiToggleButton-root.Mui-selected': {
      backgroundColor: '#92C023',
      color: '#fff',
      borderRadius: '4px',
    }
  },
  chipComponent: {
    width: '90%',
    margin: '0 auto',
    marginBottom: '2rem',
    display: 'flex',
  },
  allergies: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '0.5rem 0'
  },
  allergy: {
    margin: 2,
    border: '2px solid #92C023',
    color: '#000',
    backgroundColor: '#fff',
  },
  menu: {
    '&.MuiListItem-root.Mui-selected': {
      backgroundColor: '#92C023',
    },
    '&.MuiListItem-root.Mui-selected:hover': {
      backgroundColor: '#92C023',
    }
  }

})

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left"
  },
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const allergies = [
  'Eggs',
  'Fish',
  'Milk',
  'Mustard',
  'Peanuts', 
  'Sesame',
  'Shellfish', 
  'Soy',
  'Tree Nuts',
  'Wheat',
]


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
  streetNumber: Yup.string()
    .required('Street number is required'),
  streetName: Yup.string()
    .required('Street name is required'),
  city: Yup.string()
    .required('City is required'),
  province: Yup.string()
    .required('Province is required'),
  country: Yup.string()
    .required('Country is required'),
  postalCode: Yup.string()
    .required('Postal Code is required'),
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

const PostalCodeTextMask = (props) => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => { inputRef(ref ? ref.inputElement : null); }}
      mask={[/[A-Za-z]/,/[0-9]/,/[A-Za-z]/, ' ', /[0-9]/,/[A-Za-z]/,/[0-9]/]}
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
      streetNumber: '',
      streetName: '',
      unitNumber: '',
      city: '',
      province: '',
      country: '',
      postalCode: '',
      dietaryPreference: '',
      allergies: [],
    }
  }

  componentDidMount = () => {
    const personalDetail = JSON.parse(sessionStorage.getItem('personalDetail'))
    const addressDetail = JSON.parse(sessionStorage.getItem('addressDetail'))
    const personalization = JSON.parse(sessionStorage.getItem('personalization'))
    if(personalDetail && addressDetail && personalization) {
      this.setState({
        name: personalDetail.name,
        email: personalDetail.email,
        password: personalDetail.password,
        phoneNumber: personalDetail.phoneNumber,
        streetNumber: addressDetail.streetNumber,
        streetName: addressDetail.streetName,
        unitNumber: addressDetail.unitNumber,
        city: addressDetail.city,
        province: addressDetail.province,
        country: addressDetail.country,
        postalCode: addressDetail.postalCode,
        dietaryPreference: personalization.dietaryPreference,
        allergies: personalization.allergies
      })
    }
  }

  updateUser = () => {
    const userId = sessionStorage.getItem('userId')
    if (userId) {
      axios.put(`/api/user/${userId}`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phoneNumber.replace(/[^0-9]/g, ''),
        shipping: {
          street_num: this.state.streetNumber,
          unit_num: this.state.unitNumber,
          street_name: this.state.streetName,
          city: this.state.city,
          postal_code: this.state.city,
          province: this.state.province,
          country: this.state.country
        },
        dietary_restriction: this.state.dietaryPreference,
        allergies: this.state.allergies
      }, {
        baseURL: 'http://localhost:8000',
        auth: {
          username: this.state.email,
          password: this.state.password
        },
      }).then((response) => {
        if (response && response.data && response.status === 200) {
          sessionStorage.setItem('userId', response.data.id)
        }
      }).catch((err) => console.log(err))
    }
  }

  handleFormSubmit = (values) => {
    this.setState({ ...values }, this.updateUser)
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
                showPassword: this.state.showPassword,
                phoneNumber: this.state.phoneNumber,
                streetNumber: this.state.streetNumber,
                streetName: this.state.streetName,
                unitNumber: this.state.unitNumber,
                city: this.state.city,
                province: this.state.province,
                country: this.state.country,
                postalCode: this.state.postalCode,
                dietaryPreference: this.state.dietaryPreference || 'none', 
                allergies: this.state.allergies
              }
            }
            enableReinitialize
            validationSchema={accountDetailValidationSchema}
            onSubmit={this.handleFormSubmit}
          >
            {props => (

              <form className={classes.form} onSubmit={props.handleSubmit}>
                <TextField
                  className={classes.textField}
                  error={props.touched.name && !!props.errors.name}
                  helperText={(props.touched.name && props.errors.name) || ''}
                  label="Name"
                  name="name"
                  fullWidth
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
                  fullWidth
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
                  fullWidth
                  type={props.values.showPassword ? 'text' : 'password'}
                  value={props.values.password}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  FormHelperTextProps={{ className: classes.helperText }}
                  disabled
                  // InputProps={{
                  //   endAdornment: <InputAdornment position="end">
                  //     <IconButton
                  //       aria-label="toggle password visibility"
                  //       onClick={() => props.setFieldValue('showPassword', !props.values.showPassword, false)}
                  //     >
                  //       {props.values.showPassword ? <Visibility /> : <VisibilityOff />}
                  //     </IconButton>
                  //   </InputAdornment>
                  // }}
                />
                <TextField
                  className={classes.textField}
                  error={props.touched.phoneNumber && !!props.errors.phoneNumber}
                  helperText={(props.touched.phoneNumber && props.errors.phoneNumber) || ''}
                  label="Phone Number"
                  name="phoneNumber"
                  fullWidth
                  FormHelperTextProps={{ className: classes.helperText }}
                  InputProps={{
                    inputComponent: PhoneTextMask,
                    value: props.values.phoneNumber,
                    onChange: props.handleChange,
                    onBlur: props.handleBlur
                  }}
                />
                <div className={classes.textFieldForm}>
                  <div className={classes.addressRow}>
                    <TextField
                      className={classes.leftField}
                      error={props.touched.streetNumber && !!props.errors.streetNumber}
                      helperText={(props.touched.streetNumber && props.errors.streetNumber) || ''}
                      label="Street Number"
                      name="streetNumber"
                      type="number"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.streetNumber}
                      FormHelperTextProps={{ className: classes.helperText }}
                    />
                    <TextField
                      className={classes.rightField}
                      name="unitNumber"
                      label="Unit Number"
                      type="number"
                      value={props.values.unitNumber}
                      onBlur={props.handleBlur}
                      onChange={props.handleChange}
                    />
                  </div>
                  <TextField
                    className={classes.textField}
                    error={props.touched.streetName && !!props.errors.streetName}
                    helperText={(props.touched.streetName && props.errors.streetName) || ''}
                    label="Street Name"
                    name="streetName"
                    type="text"
                    fullWidth
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.streetName}
                    FormHelperTextProps={{ className: classes.helperText }}
                  />
                  <TextField
                    className={classes.textField}
                    error={props.touched.city && !!props.errors.city}
                    helperText={(props.touched.city && props.errors.city) || ''}
                    label="City"
                    name="city"
                    type="text"
                    fullWidth
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.city}
                    FormHelperTextProps={{ className: classes.helperText }}
                  />
                  <div className={classes.addressRow}>
                    <FormControl className={classes.leftField}>
                      <InputLabel>Province</InputLabel>
                      <Select
                        name="province"
                        error={props.touched.province && !!props.errors.province}
                        displayEmpty
                        value={props.values.province}
                        onChange={props.handleChange}
                      >
                        <MenuItem value={"ON"}>ON</MenuItem>
                        <MenuItem value={"AB"}>AB</MenuItem>
                        <MenuItem value={"BC"}>BC</MenuItem>
                        <MenuItem value={"QC"}>QC</MenuItem>
                        <MenuItem value={"PE"}>PE</MenuItem>
                        <MenuItem value={"NS"}>NS</MenuItem>
                        <MenuItem value={"NB"}>NB</MenuItem>
                        <MenuItem value={"NL"}>NL</MenuItem>
                        <MenuItem value={"MB"}>MB</MenuItem>
                        <MenuItem value={"SK"}>SK</MenuItem>
                      </Select>
                      <FormHelperText
                        className={classes.helperText }
                      >
                        {(props.touched.province && props.errors.province) || ''}
                      </FormHelperText>
                    </FormControl>
                    <FormControl className={classes.rightField}>
                      <InputLabel>Country</InputLabel>
                      <Select
                        name="country"
                        error={props.touched.country && !!props.errors.country}
                        displayEmpty
                        onBlur={props.handleBlur}
                        value={props.values.country}
                        onChange={props.handleChange}
                      >
                        <MenuItem value={"Canada"}>Canada</MenuItem>
                      </Select>
                      <FormHelperText
                        className={classes.helperText }
                      >
                        {(props.touched.country && props.errors.country) || ''}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <TextField
                    className={classes.postalCode}
                    error={props.touched.postalCode && !!props.errors.postalCode}
                    helperText={(props.touched.postalCode && props.errors.postalCode) || ''}
                    label="Postal Code"
                    name="postalCode"
                    type="text"
                    fullWidth
                    FormHelperTextProps={{ className: classes.helperText }}
                    InputProps={{
                      style: {
                        textTransform: 'uppercase'
                      },
                      inputComponent: PostalCodeTextMask,
                      value: props.values.postalCode,
                      onChange: props.handleChange,
                      onBlur: props.handleBlur
                    }}
                  />
                </div>
                <Typography variant="body1" className={classes.label}>
                  Any dietary preferences?
                </Typography>
                <ToggleButtonGroup size="large" name="dietaryPreference" value={props.values.dietaryPreference} onChange={(_event, value) => props.setFieldValue("dietaryPreference", value)} className={classes.toggleBtnGroup} exclusive>
                  <ToggleButton value="none" className={classes.toggleBtn}>
                    None
                  </ToggleButton>
                  <ToggleButton value="vegetarian" className={classes.toggleBtn}>
                    Vegetarian
                  </ToggleButton>
                  <ToggleButton value="vegan" className={classes.toggleBtn}>
                    Vegan
                  </ToggleButton>
                </ToggleButtonGroup>
                <Typography variant="body1" className={classes.label}>
                  Any Allergies?
                </Typography>
                <FormControl className={classes.chipComponent}>
                  <InputLabel>Allergies</InputLabel>
                  <Select
                    multiple
                    name="allergies"
                    value={props.values.allergies}
                    onChange={props.handleChange}
                    input={<Input />}
                    renderValue={ (selected) => (
                      <div className={classes.allergies}>
                        {selected.map(value => (
                          <Chip key={value} label={value} className={classes.allergy} />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {allergies.map(allergies => (
                      <MenuItem key={allergies} value={allergies} className={classes.menu}>
                        {allergies}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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

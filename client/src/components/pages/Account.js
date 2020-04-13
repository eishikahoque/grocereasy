import {
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar, 
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert'
import { withStyles } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import axios from 'axios';
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
  },
  backdrop: {
    zIndex: 1,
    color: '#92C023',
  },

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
}

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const allergyOptions = [
  'Dairy',
  'Egg',
  'Gluten',
  'Grain',
  'Peanut', 
  'Seafood', 
  'Sesame',
  'Shellfish', 
  'Soy',
  'Sulfite',
  'Tree Nuts',
  'Wheat',
]


const accountDetailValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Enter your name'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
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
      personalDetail: {
        name: '',
        email: '',
        password: '',
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
      },
      allergies: [],
      open: false,
      changeLoading: false
    }
  }

  componentDidMount = () => {
    const allergyList = sessionStorage.getItem('allergies')
    this.setState({
      personalDetail: JSON.parse(sessionStorage.getItem('personalDetail')),
      addressDetail: JSON.parse(sessionStorage.getItem('addressDetail')),
      allergies: allergyList && allergyList.length > 0 ? allergyList.split(',') : []
    }, () => console.log(this.state))
  }

  updateUser = () => {
    const userId = sessionStorage.getItem('userId')
    if (userId) {
      axios.put(`/api/user/${userId}`, {
        name: this.state.personalDetail.name,
        phone: this.state.personalDetail.phoneNumber.replace(/[^0-9]/g, ''),
        location: this.state.addressDetail,
        allergies: this.state.allergies
      }, {
        baseURL: 'http://localhost:8000',
        auth: {
          username: this.state.personalDetail.email,
          password: this.state.personalDetail.password
        },
      }).then((response) => {
        if (response && response.data && response.status === 200) {
          this.setState({
            open: true,
            changeLoading: false
          })
          sessionStorage.setItem('userId', response.data.id)
        }
      }).catch((err) => {
        this.setState({ changeLoading: false })
        console.log(err)
      })
    }
  }

  handleFormSubmit = (values) => {
    this.setState({
      personalDetail: {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber
      },
      addressDetail: {
        streetNumber: values.streetNumber,
        streetName: values.streetName,
        unitNumber: values.unitNumber || '',
        city: values.city,
        province: values.province,
        country: values.country,
        postalCode: values.postalCode,
      },
      allergies: values.allergies,
      changeLoading:true
    }, this.updateUser)
  }

  handleClose = () => {
    this.setState({
      open: false
    })
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
                name: this.state.personalDetail.name,
                email: this.state.personalDetail.email,
                phoneNumber: this.state.personalDetail.phoneNumber,
                streetNumber: this.state.addressDetail.streetNumber,
                streetName: this.state.addressDetail.streetName,
                unitNumber: this.state.addressDetail.unitNumber || '',
                city: this.state.addressDetail.city,
                province: this.state.addressDetail.province,
                country: this.state.addressDetail.country,
                postalCode: this.state.addressDetail.postalCode,
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
                    {allergyOptions.map(allergies => (
                      <MenuItem key={allergies} value={allergies} className={classes.menu}>
                        {allergies}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="contained" color="primary" className={classes.btn} type="submit">
                  Save Changes
                </Button>
                <Snackbar 
                  open={this.state.open} 
                  autoHideDuration={2000}
                  onClose={this.handleClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                  <Alert severity="success" style={{ backgroundColor: '#58C9BE'}} >
                      Changes saved!
                  </Alert>
                </Snackbar>
              </form>
            )}
          </Formik>
          <Backdrop className={classes.backdrop} open={this.state.changeLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
        <BottomNavBar />
      </div>
    )
  }
}
export default withStyles(styles)(Account)

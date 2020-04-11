import { Button, FormControl, InputLabel, MenuItem, Select, Backdrop, CircularProgress } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { Formik } from 'formik';
import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import * as Yup from 'yup';

import AutoCompleteSearch from './AutoCompleteSearch';


const styles = (theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 1rem',
  },
  currentLocBtn: {
    margin: '0.5rem auto 2rem auto',
    display: 'flex',

  },
  textField: {
    // padding: '0.5rem 0',
    maring: '0.5rem 0'
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
  btnRow: {
    display: 'flex',
    margin: '2rem 0',
  },
  leftBtn: {
    width: '45%',
  },
  rightBtn: {
    width: '45%',
    marginLeft: 'auto',
  },
  postalCode: {
    padding: '0.5rem 0',
  },
  postalCodeInput: {
    textTransform: 'uppercase'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.secondary,
  },
  autoAddress: {
  }

})



const addressDetailValidationSchema = Yup.object().shape({
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

class AddressDetailForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: {
        streetNumber: props.addressDetail.streetNumber || '',
        streetName: props.addressDetail.streetName || '',
        unitNumber: props.addressDetail.unitNumber || '',
        city: props.addressDetail.city || '',
        province: props.addressDetail.province || '',
        country: props.addressDetail.country || '',
        postalCode: props.addressDetail.postalCode || '',
      },
      geocoder: null,
      coordinates: {
        latitude: '',
        longitude: ''
      },
      currentLocationLoading: false,
      addressFound: !!props.addressDetail.streetNumber,
    }
    this.handleAddressAutocomplete = this.handleAddressAutocomplete.bind(this)
  }

  componentDidMount = () => {
    this.setState({
      geocoder: new window.google.maps.Geocoder()
    })
  }

  getAddressObject = (geocodeResult) => {
    return {
      streetNumber: geocodeResult[0].long_name,
      streetName: geocodeResult[1].long_name,
      unitNumber: '',
      city: geocodeResult[2].long_name,
      province: geocodeResult[5].long_name === 'Ontario' ? 'ON' : geocodeResult[5].long_name,
      country: geocodeResult[6].long_name,
      postalCode: geocodeResult[7].long_name,
    }
  }

  handleAddressAutocomplete = (placeId) => {
    this.state.geocoder.geocode({'placeId': placeId}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const address = this.getAddressObject(results[0].address_components)
          const location = results[0].geometry.location
          if (address && location) {
            this.setState({
              address,
              coordinates: {
                latitude: location.lat(),
                longitude: location.lng()
              },
              addressFound: true,
            })
          }
        }
      }
    })
    
  }

  handleBack = () => {
    this.props.onAddressBack()
  }

  handleSubmit = (values) => {
    this.props.onAddressDetailChange({
      streetNumber: values.streetNumber,
      streetName: values.streetName,
      unitNumber: values.unitNumber,
      city: values.city,
      province: values.province,
      country: values.country,
      postalCode: values.postalCode,
      coordinates: this.state.coordinates
    })
  }

  getCurrentLocation = async () => { // async is asynchronous function
    this.setState({
      currentLocationLoading: true,
    })
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition( //await says to wait for response
        position => {
          this.state.geocoder.geocode({'location': {
            lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)
          }}, (results, status) => {
            if (status === 'OK') {
              if (results[0]) {
                const { address_components } = results[0]
                this.setState({
                    address: {
                      streetNumber: address_components[0].long_name,
                      streetName: address_components[1].long_name,
                      unitNumber: '',
                      city: address_components[2].long_name,
                      province: address_components[4].long_name === 'Ontario' ? 'ON' : address_components[4].long_name,
                      country: address_components[5].long_name,
                      postalCode: address_components[6].long_name,
                    },
                    coordinates: {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude
                    },
                    addressFound: true,
                    currentLocationLoading: false,
                  })
                }
              }
          })
        },
        err => console.log(err)
      )
    }
  }



  render() {
    const { classes } = this.props;
    const { address } = this.state
    return (
      <div>
        <Formik
          initialValues={
            {
              streetNumber: address.streetNumber,
              streetName: address.streetName,
              unitNumber: address.unitNumber,
              city: address.city,
              province: address.province,
              country: address.country,
              postalCode: address.postalCode,
            }
          }
          enableReinitialize
          validationSchema={addressDetailValidationSchema}
          onSubmit={this.handleSubmit}
        >
          {props => (

            <form className={classes.form} onSubmit={props.handleSubmit}>
              <div>
                <AutoCompleteSearch 
                  className={classes.autoAddress} 
                  onAddressAutocomplete={this.handleAddressAutocomplete}>
                </AutoCompleteSearch>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.currentLocBtn}
                  onClick={this.getCurrentLocation}
                  startIcon={<MyLocationIcon />}
                >
                  Use current location
                </Button>
              </div>

              {
                this.state.addressFound &&
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
                        onBlur={props.handleBlur}
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
              }
              
              <div className={classes.btnRow}>
                <Button variant="outlined" color="primary" className={classes.leftBtn} onClick={this.handleBack}>
                  Back
                </Button>
                <Button variant="contained" color="primary" className={classes.rightBtn} type="submit">
                  Next
                </Button>
              </div>
            </form>
          )}
        </Formik>

        <Backdrop className={classes.backdrop} open={this.state.currentLocationLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
  }
}
export default withStyles(styles)(AddressDetailForm)
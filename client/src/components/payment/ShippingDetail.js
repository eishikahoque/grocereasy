import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import * as Yup from 'yup';

import AutoCompleteSearch from '../signup/AutoCompleteSearch';

const styles = (theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 1rem',
  },
  textField: {
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

})


const shippingDetailValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Enter your name'),
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



class ShippingDetailForm extends Component{
  constructor(props) {
    super(props)
    this.state = {
      shipping: {
        name: props.shippingDetail.name,
        streetNumber: props.shippingDetail.streetNumber || '',
        streetName: props.shippingDetail.streetName || '',
        unitNumber: props.shippingDetail.unitNumber || '',
        city: props.shippingDetail.city || '',
        province: props.shippingDetail.province || '',
        country: props.shippingDetail.country || '',
        postalCode: props.shippingDetail.postalCode || '',
      },
      geocoder: null,
    }
    this.handleAddressAutocomplete = this.handleAddressAutocomplete.bind(this)
  }

  componentDidMount = () => {
    this.setState({
      geocoder: new window.google.maps.Geocoder()
    })
  }




  getAddressObject = (geocodeResult) => {
    console.log(geocodeResult)
    return {
      streetNumber: geocodeResult[0].long_name,
      streetName: geocodeResult[1].long_name,
      unitNumber: '',
      city: geocodeResult[3].long_name,
      province: geocodeResult[5].short_name,
      country: geocodeResult[6].short_name,
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
              shipping: {
                ...address
              },
            })
          }
        }
      }
    })
  }

  handleSubmit = (values) => {
    this.props.onShippingDetailChange({
      name: values.name,
      streetNumber: values.streetNumber,
      streetName: values.streetName,
      unitNumber: values.unitNumber,
      city: values.city,
      province: values.province,
      country: values.country,
      postalCode: values.postalCode,
    })
  }

  handleBack = () => {
    this.props.onBack()
  }

  render() {
    const { classes } = this.props;
    const { shipping } = this.state
    return (
     <Formik
      initialValues={
        {
          name: shipping.name,
          streetNumber: shipping.streetNumber,
          streetName: shipping.streetName,
          unitNumber: shipping.unitNumber,
          city: shipping.city,
          province: shipping.province,
          country: shipping.country,
          postalCode: shipping.postalCode,
        }
      }
      enableReinitialize
      validationSchema={shippingDetailValidationSchema}
      onSubmit={this.handleSubmit}
    >
      {props => (
        <form className={classes.form} onSubmit={props.handleSubmit}>
          <div>
            <AutoCompleteSearch 
              className={classes.autoAddress} 
              onAddressAutocomplete={this.handleAddressAutocomplete}>
            </AutoCompleteSearch>
          </div>

          <div className={classes.textFieldForm}>
            <TextField
              className={classes.textField}
              error={props.touched.name && !!props.errors.name}
              helperText={(props.touched.name && props.errors.name) || ''}
              label="Name"
              name="name"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
              fullWidth
              FormHelperTextProps={{ className: classes.helperText }}
              />
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
                  <MenuItem value={"CA"}>Canada</MenuItem>
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
    )
  }
}
export default withStyles(styles)(ShippingDetailForm)

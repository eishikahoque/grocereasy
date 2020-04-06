import { Button, IconButton, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useFormik } from 'formik';
import React from 'react';
import MaskedInput from 'react-text-mask';
import * as Yup from 'yup';


const useStyles = makeStyles({
  root: {
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 2rem',
  },
  textField: {
    padding: '0.5rem 0',
  },
  btn: {
    margin: '2rem auto',
    width: '75%',
  },
  helperText: {
    fontSize: '0.75rem',
  }
});



const personalDetailValidationSchema = Yup.object().shape({
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



function PersonalDetailForm(props) {
  const classes = useStyles();
  const { handleSubmit, handleChange, handleBlur, setFieldValue, values, touched, errors } = useFormik({
    initialValues: {
      name: props.personalDetail.name,
      email: props.personalDetail.email,
      password: props.personalDetail.password,
      showPassword: false,
      phoneNumber: props.personalDetail.phoneNumber,
    },
    validationSchema: personalDetailValidationSchema,
    onSubmit(values) {
      props.onPersonalDetailChange({
        name: values.name,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
      })
    }
  })

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        className={classes.textField}
        error={touched.name && !!errors.name}
        helperText={(touched.name && errors.name) || ''}
        label="Name"
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        FormHelperTextProps={{ className: classes.helperText }}
      />
      <TextField
        className={classes.textField}
        error={touched.email && !!errors.email}
        helperText={(touched.email && errors.email) || ''}
        label="Email"
        name="email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        FormHelperTextProps={{ className: classes.helperText }}
      />
      <TextField
        className={classes.textField}
        error={touched.password && !!errors.password}
        helperText={(touched.password && errors.password) || ''}
        name="password"
        label="Password"
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        FormHelperTextProps={{ className: classes.helperText }}
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setFieldValue('showPassword', !values.showPassword, false)}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }}
      />
      <TextField
        className={classes.textField}
        error={touched.phoneNumber && !!errors.phoneNumber}
        helperText={(touched.phoneNumber && errors.phoneNumber) || ''}
        label="Phone Number"
        name="phoneNumber"
        FormHelperTextProps={{ className: classes.helperText }}
        InputProps={{
          inputComponent: PhoneTextMask,
          value: values.phoneNumber,
          onChange: handleChange,
          onBlur: handleBlur
        }}
      />

      <Button variant="contained" color="primary" className={classes.btn} type="submit">
        Next
      </Button>
    </form>
  )
}

export default PersonalDetailForm

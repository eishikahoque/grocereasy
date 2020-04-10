import { Button, Chip, FormControl, Input, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useFormik } from 'formik';
import React from 'react';


const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 1rem'
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
  chipComponent: {
    width: '90%',
    margin: '0 auto',
    marginBottom: '2rem',
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

});

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

function PersonalizationForm(props) {
  const classes = useStyles();
  const { handleSubmit, handleChange, handleBlur, setFieldValue, values, touched, errors } = useFormik({
    initialValues: {
      dietaryPreferences: 'none',
      allergies: props.personalization.allergies,
    },

    onSubmit(values) {
      props.onPersonalizationChange({
        dietaryPreferences: values.dietaryPreferences,
        allergies: values.allergies,
      })
    }
  })

  const handleBack = () => {
    props.onPersonalizationBack()
  }

  const handleToggleBtnChange = (_event, value) => {
    setFieldValue('dietaryPreferences', value)
  }

  const handleChangeMultiple = (event) => {
    const { value } = event.target
    setFieldValue('allergies', value)
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography variant="body1" className={classes.label}>
        Any dietary preferences?
      </Typography>
      <ToggleButtonGroup size="large" name="dietaryPreferences" value={values.dietaryPreferences} onChange={handleToggleBtnChange} className={classes.toggleBtnGroup} exclusive>
        <ToggleButton value= "none" className={classes.toggleBtn}>
          None
        </ToggleButton>
        <ToggleButton value="vegetarian" className={classes.toggleBtn}>
          Vegetarian
        </ToggleButton>
        <ToggleButton value= "vegan" className={classes.toggleBtn}>
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
          value={values.allergies}
          onChange={handleChangeMultiple}
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
      <div className={classes.btnRow}>
        <Button variant="outlined" color="primary" className={classes.leftBtn} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" className={classes.rightBtn} type="submit">
          Sign Up
        </Button>
      </div>
    </form>
  )
}

export default PersonalizationForm

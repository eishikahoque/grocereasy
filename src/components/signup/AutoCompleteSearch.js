import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';


const autocompleteService = { current: null };

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(2),
  },
  field: {
    width: '100%',
    margin: 'auto',
    paddingBottom: '1.5rem'
  },
  cssLabel: {
    fontFamily: 'Raleway'
  }
}));

export default function GoogleMaps(props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const onOptionSelected = (_event, value) => {
    if (value && value.place_id && value.types.includes('street_address')) {
      props.onAddressAutocomplete(value.place_id)
    }
  }

  const filterOptions = (options) => {
    return options.filter((option) => option.types && option.types.includes('street_address'))
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        const requestObj = {
          ...request,
          componentRestrictions: {
            country: 'ca'
          },
          types: ['address']
        }
        autocompleteService.current.getPlacePredictions(requestObj, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    fetch({ input: inputValue }, results => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  return (
    <Autocomplete
      id="google-map-demo"
      className={classes.field}
      getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
      onChange={onOptionSelected}
      filterOptions={filterOptions}
      options={options}
      autoComplete
      includeInputInList
      renderInput={params => (
        <TextField
          {...params}
          label="Enter Address"
          fullWidth
          onChange={handleChange}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
            }
          }}
        />
      )}
      renderOption={option => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map(match => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}

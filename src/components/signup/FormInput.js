import React from 'react';
import { TextField } from '@material-ui/core';

class FormInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: this.props.textfield.inputValue
    }
  }

  render() {
    return (
      <TextField 
        label={this.props.inputLabel}
        value={this.state.inputValue}
        onChange={this.handleInputChange}
      />
    )
  }
}


export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Standard" />
      
    </form>
  );
}

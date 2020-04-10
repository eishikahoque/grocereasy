import React, { Component } from 'react'
import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const styles = () => ({

})

const getSteps = () => {
  return ['Order is being processed', 'Your order is out for delivery', 'Your order has been delivered'];
}

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

class Confirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
       activeStep: 0,
    }
  }

  handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  handleReset = () => {
    setActiveStep(0);
  };
  
  render() {
    const { classes } = this.props
    return (
      <div>
        <Stepper activeStep={this.activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={this.activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {this.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {this.activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={this.handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
      </div>
    )
  }
}
export default withStyles(styles)(Confirmation)
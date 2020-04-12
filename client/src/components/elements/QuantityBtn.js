import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { Typography, IconButton } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    justifyContent: 'center',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)'
  },
  icon: {
    color: '#FFD043',
    fontSize: '2rem'
  },
  label: {
    padding: '0.5rem',
    fontSize: '1.5rem'
  }
});

class QuantityBtn extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       quantity: props.quantity,
       hideIcons: props.hideIcon || false,
    }
    this.handleAddQuantity = this.handleAddQuantity.bind(this)
    this.handleRemoveQuantity = this.handleRemoveQuantity.bind(this)
  }
  handleAddQuantity = () => {
    this.setState({
      quantity: this.state.quantity + 1
    }, this.updateQuantity)
  }

  handleRemoveQuantity = () => {
    this.setState({
      quantity: this.state.quantity > 1 ? this.state.quantity - 1 : this.state.quantity 
    }, this.updateQuantity)
  }

  updateQuantity = () => {
    this.props.quantityUpdated(this.state.quantity)
  }

  

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        {
          this.state.hideIcons && 
            <Typography className={classes.label}>
              {this.state.quantity}
            </Typography>
        }
        {
          !this.state.hideIcons &&
            <React.Fragment>
              <IconButton
                onClick={this.handleRemoveQuantity}
              >
                <RemoveCircleIcon className={classes.icon} />
              </IconButton>
              <Typography className={classes.label}>
                {this.state.quantity}
              </Typography>
              <IconButton
                onClick={this.handleAddQuantity}
              >
                <AddCircleIcon className={classes.icon} />
              </IconButton>
            </React.Fragment>
        }
      </div>
    )
  }
}

export default withStyles(styles)(QuantityBtn)

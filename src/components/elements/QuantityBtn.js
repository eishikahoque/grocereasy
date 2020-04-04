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
  },
});

class QuantityBtn extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       quantity: 1,
    }
    this.handleAddQuantity = this.handleAddQuantity.bind(this)
    this.handleRemoveQuantity = this.handleRemoveQuantity.bind(this)
  }
  handleAddQuantity(){
    this.setState({
      quantity: this.state.quantity + 1
    })
  }

  handleRemoveQuantity(){
    this.setState({
      quantity: this.state.quantity > 1 ? this.state.quantity - 1 : this.state.quantity 
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root} >
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
      </div>
    )
  }
}

export default withStyles(styles)(QuantityBtn)

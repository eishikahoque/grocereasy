import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: { 
    textAlign: 'center',
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  produce: {
    fontSize: '1.5rem',
  },
  price: {
    color: 'rgba(0, 0, 0, 0.65)'
  }

});

function ItemPrice(props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography className={classes.produce}>
        {props.itemName}
      </Typography>
      <Typography className={classes.price}>
        {props.itemPrice || 4}
      </Typography>
    </div>
  )
}
export default ItemPrice
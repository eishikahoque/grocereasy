import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
  itemPrice: {
    marginRight: 'auto',
  },
  produce: {
    fontSize: '1.5rem',
  },
  price: {
    color: 'rgba(0, 0, 0, 0.65)'
  }

});

function ItemPrice() {
  const classes = useStyles()
  return (
    <div className={classes.itemPrice}>
      <Typography className={classes.produce}>
        Banana
      </Typography>
      <Typography className={classes.price}>
        $0.99/lb
      </Typography>
    </div>
  )
}
export default ItemPrice
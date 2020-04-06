import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
  
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
    <div>
      <Typography className={classes.produce}>
        {props.itemName}
      </Typography>
      <Typography className={classes.price}>
        $0.99/lb
      </Typography>
    </div>
  )
}
export default ItemPrice
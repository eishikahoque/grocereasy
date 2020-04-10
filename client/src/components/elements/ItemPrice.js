import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import NumberFormat from 'react-number-format';


const useStyles = makeStyles({
  root: { 
    textAlign: 'center',
    marginTop: '0.5rem',
  },
  produce: {
    fontSize: '1.1rem',
    textTransform: 'capitalize'
  },
  price: {
    color: 'rgba(0, 0, 0, 0.65)',
    fontSize: '1rem',
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
        <NumberFormat 
          value={props.itemPrice || 4}
          displayType={'text'}
          thousandSeparator
          fixedDecimalScale
          prefix={'$'}
          decimalScale={2}
        /> 
      </Typography>
    </div>
  )
}
export default ItemPrice
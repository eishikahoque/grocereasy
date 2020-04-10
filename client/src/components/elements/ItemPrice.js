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
    textTransform: 'capitalize'
  },
  price: {
    color: 'rgba(0, 0, 0, 0.65)',
  }
});


function ItemPrice(props) {
  const classes = useStyles()

  let variant = 'body1'
  let variantPrice = 'body1'
  if(window.location.pathname === '/productDetail'){
    variant = 'h4'
    variantPrice = 'h6'
    classes.root = {
      ...classes.root,
      textAlign: 'left'
    }
  }




  return (
    <div className={classes.root}>
      <Typography variant={variant} className={classes.produce}>
        {props.itemName}
      </Typography>
      <Typography variant={variantPrice} className={classes.price}>
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
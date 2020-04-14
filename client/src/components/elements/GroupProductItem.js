import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button, Typography } from '@material-ui/core'

import ProduceBtn from './ProduceBtn'
import ItemPrice from './ItemPrice'
import QuantityBtn from './QuantityBtn'


const useStyles = makeStyles({
  items: {
    display: 'flex',
    margin: '1rem 0',
    justifyContent: 'space-between'
  },
  priceQuantity: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'flex-end',
    margin: 'auto'
  },
  price: {
    margin: 'none',
  },
  imageBtn: {
    display: 'flex',
    flexDirection: 'column',
  },
  removeBtn: {
    color: '#F4626C',
    fontSize: '0.55rem',
    borderColor: '#F4626C',
    padding: 0,
    maxWidth: '50%',
    margin: 'auto',
    marginTop: '0.25rem',
  }
})


function GroupProductItem(props) {
  const classes = useStyles()
  
  const handleRemove = () => {
    props.onRemove()
  }

  const onProductSelected = () => {
    props.productSelected()
  }

  const onQuantityUpdated = (quantity) => {
    props.quantityUpdated(quantity)
  }

  return (
    <div className={classes.items}>
      <div className={classes.imageBtn}>
        <ProduceBtn productImage={props.item['image']} productSelected={onProductSelected} />
        <Button variant="outlined" onClick={handleRemove} size="small" className={classes.removeBtn}>Remove</Button>
      </div>
      <div className={classes.priceQuantity}>
        <ItemPrice className={classes.price} itemName={props.item['name']} itemPrice={props.item['price']} />
        <Typography>{props.item['customizations']}</Typography>
        {
          !props.hideQuantity &&
          <QuantityBtn quantity={props.item['quantity']} quantityUpdated={onQuantityUpdated} />
        }
      </div>
    </div>
  
  )
}


export default GroupProductItem

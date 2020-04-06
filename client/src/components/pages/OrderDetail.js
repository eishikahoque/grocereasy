import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Divider, Card, CardContent, Button } from '@material-ui/core'

import NavBar from '../layout/NavBar'
import BottomNavBar from '../layout/BottomNavBar'
import BackBtn from '../elements/BackBtn'
import ProduceBtn from '../elements/ProduceBtn'
import QuantityBtn from '../elements/QuantityBtn'
import ItemPrice from '../elements/ItemPrice'


const useStyles = makeStyles({
  context: {
    margin: '3rem 2rem',
  },
  title: {
    fontFamily: 'Lato',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }, 
  cancelBtn: {
    borderColor: '#F4626C',
    color: '#F4626C',
    margin: '1rem auto',
    display: 'flex',
  },
  items: {
    display: 'flex',
    margin: '1rem 0',
    justifyContent: 'space-between'
  },
  priceQuantity: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  price: {
    margin: 'none',
  },
  textRow: {
    display: 'flex',
    margin: '2px 0'
  },


})

const statusColorMap = {
  'In Transit' : '#58C9BE',
  'Delivered' : '#92C023',
  'Cancelled' : '#F4626C'
}

function OrderDetail() {
  
  const onCancel = () => {
    // delete from database
  }

  const classes = useStyles()
  return (
    <div>
      <NavBar />
      <div className={classes.context}>
      <BackBtn />
        <div className={classes.title} >
          <Typography variant="h6">
            Order #14329463824
          </Typography>
          <Typography >In Transit</Typography>
        </div>
        <Divider />
        <div className={classes.textRow} style={{marginTop: '1rem'}}>
          <Typography className={classes.boldHeader}>Date Ordered:</Typography>
          <Typography> 3675286 </Typography>
        </div>
        <div className={classes.textRow}>
          <Typography className={classes.boldHeader}>Delivery Date:</Typography>
          <Typography>3675286 </Typography>
        </div>
        <Card style={{marginTop: '1rem'}}>
          <CardContent>
            <div className={classes.items}>
              <ProduceBtn />
              <div className={classes.priceQuantity}>
                fuisnfuidf
                <ItemPrice className={classes.price} />
                <QuantityBtn />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button variant="outlined" className={classes.cancelBtn} onClick={onCancel} size="small">Cancel Order</Button>
      </div>
      <BottomNavBar />
    </div>
  )
}
export default OrderDetail
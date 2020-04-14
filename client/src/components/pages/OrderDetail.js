import React, { Component } from 'react'
import { makeStyles, withStyles } from '@material-ui/styles'
import { Typography, Divider, Card, CardContent, Button } from '@material-ui/core'
import moment from 'moment'
import { withRouter } from 'react-router-dom'

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

class OrderDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      order: this.props.history.location.state
    }
  }
  render(){
    
    const order = this.state.order

    const statusColorMap = {
      'Processing' : '#58C9BE',
      'In Transit' : '#58C9BE',
      'Delivered' : '#92C023',
      'Cancelled' : '#F4626C'
    }

    const onCancel = () => {
      // props.cancel(props.order._id)
    }
  
    const classes = useStyles()

    return(
      <div>
        <NavBar />
        <div className={classes.context}>
        <BackBtn />
          <div className={classes.title} >
            <Typography variant="h6">
              Order #{order._id}
            </Typography>
            <Typography 
              style={{color: statusColorMap[order.status]}}
            >
              {order.status}
            </Typography>
          </div>
          <Divider />
          <div className={classes.textRow} style={{marginTop: '1rem'}}>
            <Typography className={classes.boldHeader}>Date Ordered:</Typography>
            <Typography> {moment(order.order_date).format("ddd MMMM DD YYYY")} </Typography>
          </div>
          <div className={classes.textRow}>
            <Typography className={classes.boldHeader}>Delivery Date:</Typography>
            <Typography> {moment(order.delivery_date).format("ddd MMMM DD YYYY - h:mA")} </Typography>
          </div>
        {/* <Card style={{marginTop: '1rem'}}>
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
        </Card> */}
        <Button variant="outlined" className={classes.cancelBtn} onClick={onCancel} size="small">Cancel Order</Button>
      </div>
      <BottomNavBar />
    </div>
    )
  }
}

export default withRouter(withStyles(useStyles)(OrderDetail))

// PREVIOUS VERSION
// import React from 'react'
// import { makeStyles } from '@material-ui/styles'
// import { Typography, Divider, Card, CardContent, Button } from '@material-ui/core'
// import moment from 'moment'

// import NavBar from '../layout/NavBar'
// import BottomNavBar from '../layout/BottomNavBar'
// import BackBtn from '../elements/BackBtn'
// import ProduceBtn from '../elements/ProduceBtn'
// import QuantityBtn from '../elements/QuantityBtn'
// import ItemPrice from '../elements/ItemPrice'


// const useStyles = makeStyles({
//   context: {
//     margin: '3rem 2rem',
//   },
//   title: {
//     fontFamily: 'Lato',
//     marginBottom: '1rem',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   }, 
//   cancelBtn: {
//     borderColor: '#F4626C',
//     color: '#F4626C',
//     margin: '1rem auto',
//     display: 'flex',
//   },
//   items: {
//     display: 'flex',
//     margin: '1rem 0',
//     justifyContent: 'space-between'
//   },
//   priceQuantity: {
//     display: 'flex',
//     flexDirection: 'column',
//     textAlign: 'center'
//   },
//   price: {
//     margin: 'none',
//   },
//   textRow: {
//     display: 'flex',
//     margin: '2px 0'
//   },


// })

// const statusColorMap = {
//   'Processing' : '#58C9BE',
//   'In Transit' : '#58C9BE',
//   'Delivered' : '#92C023',
//   'Cancelled' : '#F4626C'
// }

// function OrderDetail(props) {
  
//   const onCancel = () => {
//     props.cancel(props.order._id)
//   }

//   const classes = useStyles()

//   return (
//     <div>
//       <NavBar />
//       <div className={classes.context}>
//       <BackBtn />
//         <div className={classes.title} >
//           <Typography variant="h6">
//             Order #{props.order._id}
//           </Typography>
//           <Typography 
//           style={{color: statusColorMap[props.order.status]}}
//           >
//             {props.order.status}
//           </Typography>
//         </div>
//         <Divider />
//         <div className={classes.textRow} style={{marginTop: '1rem'}}>
//           <Typography className={classes.boldHeader}>Date Ordered:</Typography>
//           <Typography> {moment(props.order.order_date).format("ddd MMMM DD YYYY")} </Typography>
//         </div>
//         <div className={classes.textRow}>
//           <Typography className={classes.boldHeader}>Delivery Date:</Typography>
//           <Typography> {moment(props.order.delivery_date).format("ddd MMMM DD YYYY - h:mA")} </Typography>
//         </div>
//         {/* <Card style={{marginTop: '1rem'}}>
//           <CardContent>
//             <div className={classes.items}>
//               <ProduceBtn />
//               <div className={classes.priceQuantity}>
//                 fuisnfuidf
//                 <ItemPrice className={classes.price} />
//                 <QuantityBtn />
//               </div>
//             </div>
//           </CardContent>
//         </Card> */}
//         <Button variant="outlined" className={classes.cancelBtn} onClick={onCancel} size="small">Cancel Order</Button>
//       </div>
//       <BottomNavBar />
//     </div>
//   )
// }
// export default OrderDetail
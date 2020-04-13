import React from 'react'
import { Card, CardContent, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import moment from 'moment'

const useStyles = makeStyles({
  root: {
    margin: '1rem auto',
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldHeader: {
    fontWeight: 500,
    marginRight: '6px',
  },
  textRow: {
    display: 'flex',
    margin: '2px 0'
  },
  btnRow: {
    display: 'flex',
    margin: '1rem 0'
  },
  cancelBtn: {
    borderColor: '#F4626C',
    color: '#F4626C',
    marginRight: 'auto',
  }
})

const statusColorMap = {
  'Processing' : '#58C9BE',
  'In Transit' : '#58C9BE',
  'Delivered' : '#92C023',
  'Cancelled' : '#F4626C'
}

function OrderHistoryCard(props) {
  const classes = useStyles()

  const handleCancel = () => {
    props.cancel(props.item._id)
  }

  const handleViewDetails = () => {
    props.viewDetails()
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <div className={classes.heading}>
            <Typography variant="h6">Order #{props.item._id} </Typography>
            <Typography variant="h6"
            style={{color: statusColorMap[props.item.status]}}
            >
              {props.item.status}
            </Typography>
          </div>
          <div className={classes.textRow}>
            <Typography className={classes.boldHeader}>Date Ordered:</Typography>
            <Typography> {moment(props.item.order_date).format("ddd MMMM DD YYYY")} </Typography>

          </div>
          <div className={classes.textRow}>
            <Typography className={classes.boldHeader}>Delivery Date:</Typography>
            <Typography> {moment(props.item.delivery_date).format("ddd MMMM DD YYYY - h:mA")} </Typography>
          </div>
          <div className={classes.textRow}>
            <Typography className={classes.boldHeader}>Total:  </Typography>
            <Typography> ${props.item.order_summary.total} </Typography>
          </div>
          <div className={classes.btnRow}>
            <Button variant="outlined" className={classes.cancelBtn} onClick={handleCancel} size="small">Cancel Order</Button>
            <Button variant="contained" color="primary" size="small" onClick={handleViewDetails}>View Details</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderHistoryCard

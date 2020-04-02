import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'



const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: '#000000',
    fontFamily: 'Raleway',
    fontWeight: 400,
  },
  btn: {
    margin: '0.5rem 2rem',
    display: 'flex',
  },
  icon: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  location: {
    color: 'rgba(0, 0, 0, 0.50)',
    fontSize: '0.875rem'
  },
  groceryStore: {
    fontSize: '2rem',
  }
})


function GroceryStoreButton(props) {
  const classes = useStyles();
  return ( 
    props.store &&
      <Link to="/home" className={classes.link}>
        <div className={classes.btn}>
          <div>
            <Typography variant="h4" color="secondary" className={classes.groceryStore}>
              {props.store.name}
            </Typography>
            <Typography variant="body1" className={classes.location}>
              {props.store.address}
            </Typography>
          </div>
          
          <div className={classes.icon}>
            <NavigateNextIcon color="disabled" />
          </div>
        </div> 
        <Divider light variant="middle" />
      </Link>
  )
}

export default GroceryStoreButton

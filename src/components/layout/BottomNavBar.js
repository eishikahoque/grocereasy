import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Home, List, Search, ShoppingBasket } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';


const CurrentViewMap = {
  '/home': 'home',
  '/search': 'search',
  '/shoppingList': 'list',
  '/cart': 'cart'
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0',
    border: 'none',
    backgroundColor: '#fff',
  },
})


const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value)

function BottomNavBar() {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const [value, setValue] = React.useState(CurrentViewMap[location.pathname])

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    const currentPath = location.pathname
    const newPath = getKeyByValue(CurrentViewMap, newValue)
    if (newPath !== currentPath) {
      history.push(newPath)
    }
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Home" value="home" icon={<Home />} />
      <BottomNavigationAction label="Search" value="search" icon={<Search />} />
      <BottomNavigationAction label="Lists" value="list" icon={<List />} />
      <BottomNavigationAction label="Cart" value="cart" icon={<ShoppingBasket />} />
    </BottomNavigation>
  )
}

export default BottomNavBar

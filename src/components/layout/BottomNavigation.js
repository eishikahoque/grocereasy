import React from 'react';
import { makeStyles, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Home, ShoppingBasket, List, FavoriteBorderOutlined, Search } from '@material-ui/icons';


const useStyles = makeStyles({
  bottomNav: {
    width: '100%',
    position: 'fixed',
    bottom: '0',
    border: '2px solid black',
    // backgroundColor: 'green',
  },
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.bottomNav}>
      <BottomNavigationAction label="Home" value="home" icon={<Home />} />
      <BottomNavigationAction label="Search" value="search" icon={<Search />} />
      <BottomNavigationAction label="Lists" value="list" icon={<List />} />
      {/* <BottomNavigationAction label="Favorite" value="favorite" icon={<FavoriteBorderOutlined />} /> */}
      <BottomNavigationAction label="Cart" value="cart" icon={<ShoppingBasket />} />

    </BottomNavigation>
  );
}

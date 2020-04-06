import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  category: {
    padding: '3rem',
    borderRadius: '3rem',
    color: '#fff',
    backgroundColor: 'palevioletred',
    margin: '1rem',
    '& > .MuiButton-label': {
      position: 'absolute',
    }
  }
})


function CategoryBtn(props) {
  const classes = useStyles();
  return (
    <div>
      <Button variant="contained" className={classes.category}>Fruits</Button>
    </div>
  )
}

export default CategoryBtn



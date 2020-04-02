import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import React from 'react';

import banana from '../../assets/banana.png';

const useStyles = makeStyles({
  category: {
    borderRadius: '1rem',
    color: '#fff',
    backgroundColor: 'palevioletred',
    margin: '1rem',
    padding: '3rem',
  },
  image: {
    position: 'absolute',
    maxWidth: '150%',
    top: '-20px',
    right: '-50px',
  }
})

const handleRedirect = () => {

}

function ProduceBtn(props) {
  const classes = useStyles();

  return (
    <div>
      <Link to='/productDetail'>
        <Button variant="contained" className={classes.category}>
          <img src={banana} alt="banana" className={classes.image} />
        </Button>
      </Link>
    </div>
  )
}

export default ProduceBtn



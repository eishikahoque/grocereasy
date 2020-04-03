import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import React from 'react';

import banana from '../../assets/banana.png';

const useStyles = makeStyles({
  category: {
    borderRadius: '1rem',
    color: '#fff',
    padding: '2.7rem',
  },
  image: {
    position: 'absolute',
    maxWidth: '100%',
    top: '-29px',
    right: '-10px',
  }
})

const handleRedirect = () => {

}

const colors = ['#D4EB4E', '#5ECEC6', '#F3939A', '#FFD843', '#BCAFE9']

function ProduceBtn(props) {
  const classes = useStyles();
  const color = colors[Math.floor(Math.random() * colors.length)]
  return (
    <div>
      <Link to='/productDetail'>
        <Button variant="contained" className={classes.category} style={{ backgroundColor: color }}>
          <img src={banana} alt="banana" className={classes.image} />
        </Button>
      </Link>
    </div>
  )
}

export default ProduceBtn



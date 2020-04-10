import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';


const useStyles = makeStyles({
  root: { 
    margin: '0 0.5rem'
  },
  category: {
    borderRadius: '1rem',
    backgroundColor: '#fff',
    display: 'flex',
    margin: 'auto',
  },
  image: {
    // width: '30vw',
    // height: '12vh',
    width: '8rem',
    height: '6rem',
  }
})



// const colors = ['#D4EB4E', '#5ECEC6', '#F3939A', '#FFD843', '#BCAFE9']

function ProduceBtn(props) {
  const classes = useStyles();
  // const color = colors[Math.floor(Math.random() * colors.length)]

  const handleClick = () => {
    props.productSelected()
  }

  return (
    <div className={classes.root}>
      <Button variant="contained" className={classes.category} 
        // style={{ backgroundColor: color }}
        onClick={handleClick}
      >
        {
          props.productImage &&
          <img src={`https://spoonacular.com/cdn/ingredients_500x500/${props.productImage}`} alt="grocery items" className={classes.image} />
        }
      </Button>
    </div>
  )
}

export default ProduceBtn



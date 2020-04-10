import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import React from 'react';


const useStyles = makeStyles({
  category: {
    borderRadius: '1rem',
    backgroundColor: '#fff',
    maxWidth: '80%',
    height: '80%',
    display: 'flex',
    margin: 'auto',
  },
  image: {
    width: '32vw',
    height: '10vh',
  }
})



// const colors = ['#D4EB4E', '#5ECEC6', '#F3939A', '#FFD843', '#BCAFE9']

function ProduceBtn(props) {
  const classes = useStyles();
  // const color = colors[Math.floor(Math.random() * colors.length)]

  const history = useHistory()
  const handleRedirect = () => {
    history.push('/productDetail')
  }

  return (
    <div>
      <Button variant="contained" className={classes.category} 
        // style={{ backgroundColor: color }}
        onClick={handleRedirect}
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



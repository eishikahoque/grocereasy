import { Button, Card, CardContent, Fade, IconButton, Slider, Snackbar, TextField } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'


import BackBtn from '../elements/BackBtn';
import ItemPrice from '../elements/ItemPrice';
import QuantityBtn from '../elements/QuantityBtn';
import BottomNavBar from '../layout/BottomNavBar';
import NavBar from '../layout/NavBar';

const styles = (theme) => ({
  circle: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: '16.5rem',
    marginTop: '2rem',
    borderBottomLeftRadius: '10rem',
    borderBottomRightRadius: '10rem',
  },
  image: {
    maxWidth: '90%',
    maxHeight: '90%',
    margin: 'auto',
    borderRadius: '12rem'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
  },  
  icon: {
    paddingTop: 0,
    color: theme.palette.disabled.main,
  },
  context: {
    margin: '6rem 2rem',
  },
  btnRow: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2rem auto',
  },
  customBtn: {
    marginLeft: 'auto',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
  },
  cartBtn: {
    display: 'flex',
    justifyContent: 'center'
  },
  cardContainer: {
    marginBottom: '3rem',
  },
  cardContent: {
    padding: '2rem',
  },
  textArea: {
    marginTop: '1rem',
  },
  textLabel: {
    fontSize: '0.875rem'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#fff',
    borderRadius: '0.625rem',
    padding: '3rem',
    margin: 'auto',
    textAlign: 'center',
  },
  header: {
    fontFamily: 'Lato',
    fontSize: '2rem'
  }
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const QualitySlider = withStyles({
  root: {
    color: '#58C9BE',
    height: 8,
    width: '90%',
    '& >.MuiSlider-markLabel': {
      fontSize: '0.75rem'
    }
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#58C9BE',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const marks = [
  {
    value: 0,
    label: 'Firm',
  },
  {
    value: 5,
    label: 'Almost Ripe',
  },
  {
    value: 10,
    label: 'Ripe',
  },
  {
    value: 15,
    label: 'Over Ripe',
  },
]

class ProduceDetail extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      isAddedToList: false,
      open: false,
      isCustomSectionOpened: false,
      sliderValue: 6,
      comments: '',
      product: this.props.history.location.state
    }

    this.handleSliderChange = this.handleSliderChange.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.toggleCustomBtn = this.toggleCustomBtn.bind(this)
    this.handleAddToList = this.handleAddToList.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleAddToList = () => {
    this.setState({
      isAddedToList: !this.state.isAddedToList
    })
    // Add to database
  }

  handleSliderChange = (_event, newValue) => {
    this.setState({
      sliderValue: newValue
    })
  }

  handleCommentChange = (_event, value) => {
    this.setState({
      comments: value
    })
  }

  toggleCustomBtn = () => {
    this.setState({
      isCustomSectionOpened: !this.state.isCustomSectionOpened
    })
  }

  handleAddToCart = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }
  
  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <NavBar />
          <div className={classes.circle}>
            <BackBtn style={{color: '#fff'}} />
            <img src={`https://spoonacular.com/cdn/ingredients_500x500/${this.state.product.image}`} alt="produce item" className={classes.image} />
          </div>
          
          <div className={classes.context}>
            <div className={classes.title}>
             <ItemPrice itemName={this.state.product['name']} itemPrice={this.state.product['price']} className={classes.name} />
              <IconButton onClick={this.handleAddToList}>
                { this.state.isAddedToList ?
                  <BookmarkIcon fontSize="large" className={classes.icon} /> :
                  <BookmarkBorderIcon fontSize="large" className={classes.icon} />
                }
              </IconButton>
            </div>
            <div className={classes.btnRow}>
              <QuantityBtn />
              <Button variant="outlined" color="secondary" className={classes.customBtn} onClick={this.toggleCustomBtn}>
                { this.state.isCustomSectionOpened ? 'Hide' : 'Customize' }
              </Button>
            </div>
            { this.state.isCustomSectionOpened &&
              <Fade in={this.state.isCustomSectionOpened} timeout={1000}>
                <Card className={classes.cardContainer}>
                  <CardContent className={classes.cardContent}>
                    <QualitySlider 
                      min={0}
                      step={5}
                      max={15}
                      defaultValue={10}
                      marks={marks}
                      value={this.state.sliderValue}
                      onChange={this.handleSliderChange}
                      valueLabelDisplay="off"
                    />
                    <TextField 
                      label="Special instructions"
                      multiline
                      fullWidth
                      rows="4"
                      value={this.state.comments}
                      variant="outlined"
                      classes={{
                        root: classes.textArea
                      }}
                      color="secondary"
                      size="small"
                      type="text"
                      onChange={this.handleCommentChange}
                    />
                  </CardContent>
                </Card>
              </Fade>
            }
            <div className={classes.cartBtn}>
              <Button variant="contained" color="primary" onClick={this.handleAddToCart}>
                Add to cart
              </Button>
            </div>
            <Snackbar 
              open={this.state.open} 
              autoHideDuration={2000} 
              onClose={this.handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity="success" style={{ backgroundColor: '#58C9BE'}} >
                Item added to cart!
              </Alert>
            </Snackbar>
          </div>
          
        <BottomNavBar />
      </React.Fragment>
    )
  }
}
export default withRouter(withStyles(styles)(ProduceDetail))

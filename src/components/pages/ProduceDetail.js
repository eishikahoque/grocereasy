import { Button, Card, CardContent, Fade, IconButton, Slider, TextField, Typography, Modal, } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';

import banana from '../../assets/banana.png';
import BackBtn from '../elements/BackBtn';
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
    maxWidth: '75%',
    margin: 'auto',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
  name: {
    marginRight: 'auto'
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
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
    width: '25ch',
    marginTop: '1rem',
  },
  textLabel: {
    fontSize: '14px'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '3rem',
    margin: 'auto',
    textAlign: 'center',
  },
  header: {
    fontFamily: 'Lato',
    fontSize: '2rem'
  }
});

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
      modalOpen: false,
      isCustomSectionOpened: false,
      sliderValue: 6,
      comments: '',
    }
    this.handleSliderChange = this.handleSliderChange.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.toggleCustomBtn = this.toggleCustomBtn.bind(this)
    this.handleAddToList = this.handleAddToList.bind(this)
  }

  handleAddToList = () => {
    this.setState({
      modalOpen: true,
    })
    // this.setState({
    //   isAddedToList: !this.state.isAddedToList
    // })
  }

  // handleOpenModal = () => {
  //   this.setState({
  //     modalOpen: true,
  //   })
  // }

  handleCloseModal = () => {
    this.setState({
      modalOpen: false
    })
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
  
  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <NavBar />
          <div className={classes.circle}>
            <BackBtn iconColor={'#fff'} />
            <img src={banana} alt="banana" className={classes.image} />
          </div>
          
          <div className={classes.context}>
            <div className={classes.title}>
              <div className={classes.name}>
                <Typography>
                  Banana
                </Typography>
                <Typography>
                  $0.99/lb
                </Typography>
              </div>
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
              <Button variant="contained" color="primary">
                Add to cart
              </Button>
            </div>

          </div>

          <Modal
            className={classes.modal}
            open={this.state.modalOpen}
            onClose={this.handleCloseModal}
          >
            <Fade in={this.state.modalOpen}>
              <div className={classes.paper}>
                <Typography variant="h4" className={classes.header}>
                  Shopping Lists
                </Typography>

              </div>
            </Fade>
          </Modal>
          
        <BottomNavBar />
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(ProduceDetail)

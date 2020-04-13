import {
  AppBar,
  Badge,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import SmsRoundedIcon from '@material-ui/icons/SmsRounded';
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import socketIOClient from "socket.io-client";


const styles = () => ({
  appBar: {
    '&.MuiPaper-elevation4': {
      boxShadow: 'none',
    },
  },
  logoTitle: {
    fontFamily: 'Lato',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#fff',
    textAlign: 'start',
  },
  icons: {
    marginLeft: 'auto',
  },
  menu: {
    backgroundColor: '#F4626C',
    color: '#fff',
    padding: '1rem',
  },
  divider: {
    backgroundColor: '#fff',
    opacity: '40%'
  },
  closeIcon: {
    marginLeft: 'auto',
    padding: 0,
    color: '#fff'
  },
  msgIcon: {
    color: '#fff'
  }
})

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
       isMenuOpen: false,
       count: 0,
       endpoint: '//localhost:8000/',
    }
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("message", () => {
      if (this.props.location.pathname !== "/chat") {
        this.setState({
          count: this.state.count + 1,
        });
      }
    });
  }

  toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    })
  }

  removeMessage = () => {
    this.setState({
      count: 0,
    });
  };

  handleMenuText = (event) => {
    const text = event.target.innerText
    if(text === 'My Orders') {
      this.props.history.push('/orders')
    } else if(text === 'My Account') {
      this.props.history.push('/account')
    } else if(text === 'Logout') {
      this.props.history.replace('/')
    }
  }
  
  
  render() {
    const { classes } = this.props;
      return (
        <div>
          
         <AppBar className={classes.appBar} color="primary">
           <Toolbar>
             <IconButton
              color="inherit"
              onClick={this.toggleMenu}
              edge="start"
             >
               <MenuIcon />
             </IconButton>
             <Typography className={classes.logoTitle}>grocereasy</Typography>
             <div className={classes.icons}>
               <Link to='/chat' onClick={this.removeMessage}>
                <IconButton className={classes.msgIcon}>
                  <Badge 
                    color="error"
                    badgeContent={this.state.count}
                  >
                    <SmsRoundedIcon />
                  </Badge>
                </IconButton>
               </Link>
             </div>
           </Toolbar>
         </AppBar>

         <Drawer
          anchor="left"
          open={this.state.isMenuOpen}
          onClose={this.toggleMenu}
          classes={{
            paper: classes.menu
          }}
         >
          <IconButton onClick={this.toggleMenu} className={classes.closeIcon}>
            <CloseIcon />
          </IconButton>
           <List>
            {
              ['My Orders', 'My Account', 'Logout'].map(
                (text) => (
                  <React.Fragment key={text}>
                    <ListItem button  onClick={this.handleMenuText}>
                      <ListItemText primary={text} />
                    </ListItem>
                    <Divider light variant="middle" className={classes.divider} />
                  </React.Fragment>
                )
              )
            }
          </List>
         </Drawer>
        </div>
      )
  }
}
export default withRouter(withStyles(styles)(NavBar))

import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Drawer, Badge, AppBar, Toolbar, List, Typography, IconButton, ListItem, ListItemText , Divider} from '@material-ui/core/';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import SmsRoundedIcon from '@material-ui/icons/SmsRounded';
import CloseIcon from '@material-ui/icons/Close';

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
  }
})

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
       isMenuOpen: false
    }
  }

  toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    })
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
             <Typography className={classes.logoTitle}>
               grocereasy
             </Typography>
             <div className={classes.icons}>
               <IconButton color="inherit">
                 <Badge 
                  color="error"
                  badgeContent={3}
                >
                   <SmsRoundedIcon />
                 </Badge>
               </IconButton>
               <IconButton color="inherit">
                 <Badge 
                  color="error"
                  badgeContent={3}
                >
                   <NotificationsIcon />
                 </Badge>
               </IconButton>
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
          <IconButton color="inherit" onClick={this.toggleMenu} className={classes.closeIcon}>
            <CloseIcon />
          </IconButton>
           <List>
            {
              ['My Orders', 'My Account', 'Logout'].map(
                (text) => (
                  <React.Fragment key={text}>
                    <ListItem button >
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
export default withStyles(styles)(NavBar)

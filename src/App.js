import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './components/login/Login';
import LoadingScreen from './components/pages/LoadingScreen'
import Registration from './components/signup/Registration'
import GroceryStoreOption from './components/pages/GroceryStoreOption'
import Home from './components/pages/Home'
import ProduceDetail from './components/pages/ProduceDetail'
import ShoppingListPage from './components/pages/ShoppingListPage'
import SearchPage from './components/pages/SearchPage'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#92C023',
      contrastText: '#fff'
    },
    secondary: {
      main: '#58C9BE',
    },
    error: {
      main: '#F4626C',
    },
    disabled: {
      main: 'rgba(0, 0, 0, 0.23)',
    }
    
  },
  typography: {
    fontSize: 16,
    htmlFontSize: 16,
    fontFamily: [
      'Raleway'
    ],
    fontWeight: '400',
    h1: {
      fontFamily: 'Lato'
    },
    button: {
      fontFamily: 'Raleway',
      fontWeight: 500,
      fontSize: '1rem',
    },
    caption: {
      fontSize: '1rem',
    },
    body: {
      fontFamily: 'Raleway',
      fontWeight: 400,
      fontSize: '1rem',
    }
  }
});

function App() {
  return (
    <Router>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path='/' exact component={LoadingScreen} />
            <Route path='/signup' component={Registration} />
            <Route path='/login' component={Login} />
            <Route path='/grocerystores' component={GroceryStoreOption} />
            <Route path='/home' component={Home} />
            <Route path='/productDetail' component={ProduceDetail} />
            <Route path='/shoppingList' component={ShoppingListPage} />
            <Route path='/search' component={SearchPage} />

          </Switch> 
        </ThemeProvider>
      </React.Fragment>

    </Router>
  
  );
}

export default App

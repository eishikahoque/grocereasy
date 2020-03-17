import React from 'react';
import './App.css';
import AddressMap from './components/signup/AddressMap';
import HomeAppBar from './components/layout/HomeAppBar';
import BottomNavigation from './components/layout/BottomNavigation';
import RegisterForm from './components/signup/RegisterForm';

function App() {
  return (
    <React.Fragment>
      <HomeAppBar />
      <RegisterForm />
      <AddressMap />
      <BottomNavigation />
    </React.Fragment>
  
  );
}

export default App

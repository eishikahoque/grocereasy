import React from 'react';
import './App.css';
import AddressMap from './components/signup/AddressMap';
import HomeAppBar from './components/layout/HomeAppBar';
import BottomNavigation from './components/layout/BottomNavigation';
import RegisterForm from './components/signup/RegisterForm';

function App() {
  return (
    <div>
      <HomeAppBar />
      <RegisterForm />
      <AddressMap />
      <BottomNavigation />
     

    </div>
  );
}

export default App

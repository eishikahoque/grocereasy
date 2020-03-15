import React from 'react';
import './App.css';
import AddressMap from './components/signup/AddressMap';
import HomeAppBar from './components/layout/HomeAppBar';
import BottomNavigation from './components/layout/BottomNavigation';

function App() {
  return (
    <div>
      {/* <HomeAppBar /> */}
      <AddressMap />
      <BottomNavigation />
     

    </div>
  );
}

export default App

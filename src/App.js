//the command for running the app is yarn start because we've used yarn to install the dependencies.

import './App.css';
import React from 'react';
import {Route,Routes} from 'react-router-dom'
import Loginpage from './pages/loginpage'
import Layout from './layout';
import IndexPage from './pages/indexpage';
import Registerpage from './pages/Registerpage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path={'/login'} element={<Loginpage/>}/>
        <Route path={'/register'} element={<Registerpage/>}/>
      </Route>

    </Routes>
    
    
  );
}

export default App;

//the command for running the app is yarn start because we've used yarn to install the dependencies.

import './App.css';
import React ,{useEffect} from 'react';
import { Route,Routes} from 'react-router-dom'
import Loginpage from './pages/loginpage'
import Layout from './layout';
import IndexPage from './pages/indexpage';
import Registerpage from './pages/Registerpage';
import Create from './pages/CreatePost';
import { UserContextProvider } from './UserContext';
import PostPage from './pages/PostPage';
function App() {
 
  return (
    
    <UserContextProvider>
      
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path={'/login'} element={<Loginpage/>}/>
        <Route path={'/register'} element={<Registerpage/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/post/:id' element ={<PostPage/>}/>        
      </Route>

    </Routes>
    </UserContextProvider>
    
    
  );
}

export default App;

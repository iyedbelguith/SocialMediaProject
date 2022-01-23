import React, {useContext} from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import { Container } from 'semantic-ui-react';

import './App.css';

import MenuBar from './components/MenuBar';
import { AuthContext, AuthProvider } from './context/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar/>
          <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route  exact path='/login' element={localStorage.getItem('jwtToken') ? <Navigate to="/"/>:<Login/>}></Route>
            <Route exact path='/register' element={localStorage.getItem('jwtToken')  ? <Navigate to="/"/>:<Register/>}></Route>
            <Route exact path='/posts/:postId' element={<SinglePost/>}></Route>
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;

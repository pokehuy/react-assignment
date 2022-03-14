import React from 'react';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostsPage from './pages/PostsPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';
//import {Navbar,Nav,Container} from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
    <div>
      <nav>
        <Link className='c' to='/'>Home</Link>
        <Link className='c' to='/posts'>Posts</Link>
        <Link className='c' to='/profile'>Profile</Link>
        <Link className='c' to='/login'>Login</Link>
      </nav>
    
        <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/posts" element={<PostsPage />}/>
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    
    </div>
    </BrowserRouter>
  );
}

export default App;

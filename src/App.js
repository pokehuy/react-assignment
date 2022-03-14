import React from 'react';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostsPage from './pages/PostsPage';
import ProfilePage from './pages/ProfilePage';
import {Navbar,Nav,Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <BrowserRouter>
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    
        <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/posts" element={<PostsPage />}/>
        <Route path="/profile" element={<ProfilePage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;

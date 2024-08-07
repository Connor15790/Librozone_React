import React, { useState, useEffect } from 'react';
import './App.css';
import Navbaar from './components/Navbar';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { UserProvider } from './context/users/userContext';
import Admin from './pages/Admin';
import BookbyCategory from './pages/BookbyCategory';
import PrivateRoute from './components/PrivateRoutes';
import Book from './pages/Book';
import BookState from './context/books/BookState';
import AddBooks from './pages/AddBooks';
import Shelf from './pages/Shelf';
import AddPopular from './pages/AddPopular';
import About from './pages/About';

function App() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    if (token) {
      setUsername(storedName);
      setToken(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    const token = localStorage.getItem('token');
    if (!token) {
      setToken('');
      setUsername('')
    }

    // navigate('/');
  };

  return (
    <div className="App">
      <UserProvider>
        <BookState>
          <Router>
            <Navbaar username={username} token={token} handleLogout={handleLogout} />
            <Routes>
              <Route exact path='/' element={<Login setUsername={setUsername} setToken={setToken} />} />
              <Route exact path='/signup' element={<Signup />} />
              {/* <Route exact path='/home' element={<Home token={token} />} /> */}

              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Home token={token} />} />
                <Route exact path="/books/:category" element={<BookbyCategory />} />
                <Route exact path="/book" element={<Book />} />
                <Route exact path='/admin' element={<Admin />} />
                <Route exact path='/addbooks' element={<AddBooks />} />
                <Route exact path='/shelf' element={<Shelf />} />
                <Route exact path='/addpopular' element={<AddPopular />} />
                <Route exact path='/about' element={<About />} />
              </Route>
            </Routes>
          </Router>
        </BookState>
      </UserProvider>
    </div>
  );
}

export default App;

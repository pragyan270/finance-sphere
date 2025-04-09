import {Navigate,Route, Routes} from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage'
import HomePage from './Pages/HomePage';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <div className="App">
      <h1>Finance-Sphere</h1>
      <br/>
      <br/>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;

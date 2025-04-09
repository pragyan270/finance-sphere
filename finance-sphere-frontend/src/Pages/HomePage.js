import React, {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { handleSuccess }  from '../utils/utils';
import { ToastContainer } from 'react-toastify';




function HomePage() {

  const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])
    const handleLogout = (e) => {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      handleSuccess('User Loggedout');
      setTimeout(() => {
          navigate('/login');
      }, 1000)
  }

  return (

    <div>HomePage
      
      <h1>Welcome {loggedInUser}</h1>
      <br/>
      <br/>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </div>
    
  )
}

export default HomePage;
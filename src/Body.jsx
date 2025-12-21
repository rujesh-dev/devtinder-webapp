
import Navbar from './components/Navbar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Footer from './components/Footer'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from './utils/userSlice'
import { useEffect } from 'react';
import { BASE_URL } from './utils/constants'

function Body() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try{
    const res = await axios.get(BASE_URL+"/profile/user",
      {withCredentials: true}
    );
   
    dispatch(addUser(res.data));
    
    }catch(e){
       if(e.status === 401){
       navigate("/login");
    }
      console.error(e.message)
    }
  }

useEffect(()=>{
fetchUser();
}, [])


  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body

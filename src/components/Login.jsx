import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

function Login() {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [ email, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const loginHandler = async ()=>{
        try{
            const res = await axios.post(BASE_URL+"/login", {
                email,
                password
            }, {withCredentials: true})
            dispatch(addUser(res.data))
            // console.log(res.data);
            return navigate("/feed")
        }catch(e){
            console.error(e)
            setError(e.response.data);
        }
    }

    const handleSignUp = async() => {
       try{
         const res = await axios.post(BASE_URL+"/signup", {
            firstName,
            lastName,
            email,
            password
        }, {withCredentials: true})
         dispatch(addUser(res.data))
         return navigate("/profile");
       }catch(e){
        console.error(e.message)
       }
    }


    return (

        <div className='flex justify-center mt-8'>
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                   {!isLoggedIn && <><fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input type="text" className="input" placeholder="Type here" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                        
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input type="text" className="input" placeholder="Type here"  value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                      
                    </fieldset></>}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email ID</legend>
                        <input type="text" className="input" placeholder="Type here" value={email} onChange={(e)=>{setEmailId(e.target.value)}}/>
                        
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="password" className="input" placeholder="Type here"  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                      
                    </fieldset>
                    <p className='text-red-600'>{error}</p>
                    <p className='cursor-pointer' onClick={()=> setIsLoggedIn(!isLoggedIn)}>{isLoggedIn ? "New user? Please sign up!" : "Existing user? Please Sign In!"}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={isLoggedIn ? loginHandler : handleSignUp   }>{isLoggedIn ? "Login" : "Sign up"}</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login

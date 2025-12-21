import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [ email, setEmailId] = useState("chintu@gmail.com");
    const [password, setPassword] = useState("Chintu@123");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const loginHandler = async ()=>{
        try{
            const res = await axios.post("http://localhost:3000/login", {
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
    return (

        <div className='flex justify-center'>
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email ID</legend>
                        <input type="text" className="input" placeholder="Type here" value={email} onChange={(e)=>{setEmailId(e.target.value)}}/>
                        
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="text" className="input" placeholder="Type here"  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                      
                    </fieldset>
                    <p className='text-red-600'>{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={loginHandler}>Login</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login

import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';
import { useSearchParams } from 'react-router-dom';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests)
  const getRequestData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true })
      dispatch(addRequests(res.data))
      // console.log(res.data[0].fromUserId);


    } catch (e) {
      console.error(e.message)
    }
  }


  const handleRequest = async(status, _id) =>{
    try{
      const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id, {}, {withCredentials: true});
      dispatch(removeRequest(_id))
    }catch(e){
      console.error(e.message);
      
    }
  }

  useEffect(() => {
    getRequestData()
  }, [])



  if (!requests) return;

  if (requests.length === 0) return <h1 className='text-center'>No Requests!</h1>


  return (
    <div className='text-center my-5'>
      <h1 className='my-5 text-2xl'>Requests</h1>
      <div className='grid grid-cols-1 gap-2 place-items-center'>
        {
          requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

            return (
              <div className='flex justify-between bg-base-300 p-3 rounded-2xl items-center' key={_id}>

                <div>
                <img src={photoUrl} alt="Profile" className='h-20 w-20 rounded-full' />
                </div>





                <div className='flex flex-col md:flex-row ml-4 gap-4'>
                <div className='text-right'>
                  <h2>{firstName + " " + lastName}</h2>
                  <p>{age + ", " + gender}</p>
                  <p>{about}</p>
                </div>

                <div className='flex flex-row gap-2 my-6'>
                <button className="btn btn-active btn-primary" onClick={()=>handleRequest('rejected', request._id)} >Ignore</button>
                <button className="btn btn-active btn-secondary" onClick={()=>handleRequest('accepted', request._id)}>Interested</button>
                </div>
                </div>

              </div>)

          })
        }
      </div>
    </div>)

}


export default Requests

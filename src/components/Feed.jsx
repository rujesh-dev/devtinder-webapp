import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store) => store.feed );
  const dispatch = useDispatch();

  const getFeed = async () => {
    // if(feed) return;
    
    try{
      const res = await axios.get(BASE_URL+"/user/feed", {withCredentials: true});
     
      dispatch(addFeed(res.data));
      //  console.log(res.data)
    }catch(e){
      console.error(e.message)
    }
  }

  useEffect(()=>{
  getFeed();
  }, [])

  return (
   feed && ( <div>
      <UserCard feed={feed[0]}/>
    </div>)
  )
}

export default Feed

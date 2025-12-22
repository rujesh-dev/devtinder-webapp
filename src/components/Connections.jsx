import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice';


const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections)
    const getConnectionsData = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });

            dispatch(addConnections(res.data.data));
            // console.log(res.data.data);


        } catch (e) {
            console.error(e.message)
        }
    }

    useEffect(() => {
        getConnectionsData()
    }, [])

    if (!connections) return;

    if (connections.length === 0) return <h1>No Connections!</h1>


    return (
        <div className='text-center my-5' key={connections._id}>
            <h1 className='my-5 text-2xl'>Connections</h1>
            <div className='flex justify-center flex-col items-center'>
                {
                    connections.map((connection) => {
                        const { _id, firstName, lastName, photoUrl, age, gender, about } = connection
                        return (<div className='flex w-1/4 justify-between bg-base-300 p-3 rounded-2xl' key={_id}>

                            <img src={connection.photoUrl} alt="Profile" className='h-20 w-20 rounded-full' />







                            <div>
                                <h2>{firstName + " " + lastName}</h2>
                                <p>{age + ", " + gender}</p>
                                <p>{about}</p>
                            </div>
                        </div>)

                    })
                }
            </div>
        </div>)

}

export default Connections

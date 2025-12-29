import React, { use, useState } from 'react'
import UserCard from "./UserCard"
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [error, setError] = useState("");
    const [about, setAbout] = useState(user.about);
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const editProfileData = async () => {
        try {

            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
            },
                { withCredentials: true });

            dispatch(addUser(res?.data?.data))
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false)
            }, 3000)


        } catch (e) {
            console.error(e.message)
            setError(e.message)
        }
    }



    return (
        (user &&
            <div className='flex justify-center mx-9 mb-9 flex-wrap'>
                <div className='flex justify-center my-9 mx-10'>
                    <div className="card bg-base-300 w-96 shadow-sm">
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">FirstName</legend>
                                <input type="text" className="input" placeholder="Type here" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />

                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">LastName</legend>
                                <input type="text" className="input" placeholder="Type here" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />

                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">photoUrl</legend>
                                <input type="text" className="input" placeholder="Type here" value={photoUrl} onChange={(e) => { setPhotoUrl(e.target.value) }} />

                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">age</legend>
                                <input type="text" className="input" placeholder="Type here" value={age} onChange={(e) => { setAge(e.target.value) }} />

                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender</legend>
                                {/* <input type="text" className="input" placeholder="Type here" value={gender} onChange={(e) => { setGender(e.target.value) }} /> */}
                                <select name="cars" id="cars" value={gender} onChange={(e) => { setGender(e.target.value) }} className='text-white bg-base-100 h-8 w-80'>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                    <option value="other">other</option>
                                </select>

                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">About</legend>
                                {/* <input type="text" className="input" placeholder="Type here" value={about} onChange={(e) => { setAbout(e.target.value) }} /> */}
                                <textarea className="textarea" value={about} onChange={(e) => { setAbout(e.target.value) }} placeholder="Bio"></textarea>

                            </fieldset>
                            <p className='text-red-600'>{error}</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" onClick={editProfileData}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                {showToast && <div className="toast toast-top toast-center">

                    <div className="alert alert-success">
                        <span>Updated successfully.</span>
                    </div>
                </div>}

                <UserCard feed={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>

        ))
}

export default EditProfile

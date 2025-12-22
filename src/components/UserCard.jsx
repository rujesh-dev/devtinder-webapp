import React from 'react'

const UserCard = ({feed}) => {
    const {firstName, lastName, photoUrl, age, gender, about} = feed;
    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-300 w-80 shadow-sm">
                <figure>
                    <img
                        src={photoUrl}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <p>{age + ", "+ gender}</p>
                    <p>{about}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary">Ignore</button>
                        <button className="btn btn-secondary">Interested</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard

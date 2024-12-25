import React from 'react'
import { useParams } from 'react-router-dom';

function UserInfo() {
    const { id } = useParams();
  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold">User Info: {id}</h1>
    <p>This is where the user information will go.</p>
  </div>
  )
}

export default UserInfo
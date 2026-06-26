'use client'

import { EditUserInfo } from '@/lib/EditData/User'
import { Button, Card } from '@heroui/react'

import React from 'react'
import toast from 'react-hot-toast';

function SubUserpage ({result}) {

const Blockuser = async (user) => {
  try {
    const data = {
      isBlocked: true,
      name: user?.name,
      isPremium: user?.isPremium,
      image: user?.image,
    };

    const result = await EditUserInfo(data, user?.email);

    if (result.modifiedCount > 0) {
      toast.success("User blocked successfully"); 
  
    } else {
      toast("No changes were made.");
    }

    console.log(result);
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};


const unBlockuser = async (user) => {
  try {
    const data = {
      isBlocked: false ,
      name: user?.name,
      isPremium: user?.isPremium,
      image: user?.image,
    };

    const result = await EditUserInfo(data, user?.email);

    if (result.modifiedCount > 0) {
      toast.success("User unblocked successfully"); 
  
    } else {
      toast("No changes were made.");
    }

    console.log(result);
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};
  return (
    <div>
      {
        result.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-700">
              No User Found 😢
            </h2>
            <p className="text-gray-500 mt-2">
              Try searching with another keyword.
            </p>
          </div>
        ) : (
           <div >
             <div className="mx-5">
          <h1 className="text-3xl font-bold">Manage All Users</h1>
          <p className="text-default-500">
            Welcome back! Here's a quick summary of your activity.
          </p>
        </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 m-5'> 
          
       
            {
              result.map( user => (
                <Card key={user._id} className="p-5  rounded-2xl shadow-md space-y-3">

      {/* User Info */}
      <div className="flex items-center gap-4">
        <img
          src={user.image}
          alt="user"
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h2 className="text-lg font-bold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Extra Info */}
      <div className="text-sm text-gray-600 space-y-1">
        <p><b>Role:</b> {user.role}</p>
        <p><b>Premium:</b> {user.isPremium ? "Yes" : "No"}</p>
        <p>
          <b>Status:</b>{" "}
          {user.isBlocked ? (
            <span className="text-red-500 font-bold">Blocked</span>
          ) : (
            <span className="text-green-600 font-bold">Active</span>
          )}
        </p>
        <p><b>Joined:</b> {new Date(user.createdAt).toLocaleString()}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        {!user.isBlocked ? (
          <Button
           onClick={() => Blockuser(user)}
            className="bg-red-500 text-white"
          >
            Block User
          </Button>
        ) : (
          <Button
            onClick={() => unBlockuser(user)}
            className="bg-green-600 text-white"
          >
            Unblock User
          </Button>
        )}
      </div>

    </Card>
              ))
            }
          </div>
          </div>
        )
      }
    </div>
  )
}

export default SubUserpage 
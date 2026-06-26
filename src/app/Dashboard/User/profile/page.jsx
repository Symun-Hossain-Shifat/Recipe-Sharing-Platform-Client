'use client';

import React, { useEffect, useState } from 'react';
import {
  Mail,
  MapPin,
  Calendar,
  Camera,
  Check,
  Crown,
  LogOut,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import {  useRouter } from 'next/navigation';
import { Button } from '@heroui/react';
import { EditUserInfo } from '@/lib/EditData/User';
import toast from 'react-hot-toast';


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
    const [isSaved, setIsSaved] = useState(false);
    const [isPremium, setIsPremium] = useState(false); 
    const router = useRouter()
  const { data: session, isPending } = authClient.useSession();

  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (session?.user) {
      setUserData(session.user);
    }
  }, [session]);

  if (!mounted || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const user = userData;
 
  
  const GetNewUserData = async (e) => {
    e.preventDefault();

    const formData = e.target;

    const name = formData.Name.value;
    const image = formData.Image.value;
    const isPremium = user?.isPremium ;
    const  isBlocked = user?.isBlocked 
    const result = await EditUserInfo(
      { name, image , isPremium , isBlocked  },
      user?.email
    );

    if (result?.success || result) {
      // UI instantly update
      setUserData((prev) => ({
        ...prev,
        name,
        image,
      }));

      toast.success('Profile Updated Successfully');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No User Found
      </div>
    );
  }


  // LOGOUT FIX
  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/');
  };


  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-orange-100">
          <h1 className="text-xl font-bold text-orange-600">
            My Profile
          </h1>

          <Button
           variant="danger-soft"
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl p-6 flex items-center gap-6 border border-orange-100">

          <div className="relative">
            <img
              src={user.image || 'https://via.placeholder.com/100'}
              className="w-24 h-24 rounded-full object-cover border-4 border-orange-200"
              alt="profile"
            />
            <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full cursor-pointer">
              <Camera size={14} />
            </label>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {user.name}
              {isPremium && (
                <span className="text-orange-500 flex items-center gap-1 text-sm">
                  <Crown size={16} />
                  Premium
                </span>
              )}
            </h2>

            <p className="text-gray-500">{user.email}</p>
          </div>
{/* 
        <Button
           variant="danger-soft"
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            <LogOut size={16} />
            Logout
          </Button> */}
        </div>

        {/* TABS */}
        <div className="flex bg-white p-2 rounded-xl border border-orange-100">
          {['overview', 'settings', 'premium'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 p-2 rounded-lg text-sm font-medium ${
                activeTab === tab
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:bg-orange-50'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="bg-white p-6 rounded-2xl border border-orange-100">

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-2">
              <p className="text-gray-600">
                {user.name}
              </p>

              <div className="flex gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {user.location || 'Not Found'}
                </span>

              
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
             <form  onSubmit={GetNewUserData} className="space-y-4">
            
                          <input
                            className="w-full border border-orange-200 p-2 rounded"
                            type='text'
                            placeholder='Enter Your Name' 
                            name='Name'
                            required
                            
                           
                          />
            
                          <input
                            className="w-full border border-orange-200 p-2 rounded"
                            placeholder='Enter Your Image URL'
                            type='url' 
                            name='Image' 
                            required
                            
                          />
            
                          <button type='submit' className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                            {isSaved ? (
                              <>
                                <Check size={14} /> Saved
                              </>
                            ) : (
                              'Save Changes'
                            )}
                          </button>
                        </form>
          )}

          {/* PREMIUM */}
          {activeTab === 'premium' && (
            <div className="space-y-3">

              <h2 className="text-lg font-bold text-orange-600">
                Upgrade to Premium 👑
              </h2>

              <ul className="text-sm text-gray-600">
                <li>✔ Unlimited recipe upload</li>
                <li>✔ Premium badge</li>
                <li>✔ Priority listing</li>
              </ul>

              {!isPremium === false ? (
                <button
                  
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Pay with Stripe
                </button>
              ) : (
                <p className="text-green-600">
                  You are already Premium 🎉
                </p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
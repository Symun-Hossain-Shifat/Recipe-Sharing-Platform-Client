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
       
       await authClient.signOut();
    router.push('/');
      toast.success('Profile Updated Successfully ! You are Logged Out , Please Signin Again');
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
      <div className="min-h-screen flex items-center justify-center  text-orange-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center bg-zinc-900 p-4 sm:p-6 rounded-3xl border border-zinc-800 shadow-xl">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            My Profile
          </h1>

          <Button
            variant="danger-soft"
            onClick={handleLogout}
            className="flex items-center gap-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-800/60 text-rose-300 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-zinc-900 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 border border-zinc-800 shadow-xl">

          <div className="relative shrink-0">
            <img
              src={user.image || 'https://via.placeholder.com/100'}
              className="w-24 h-24 rounded-full object-cover border-4 border-zinc-800 shadow-lg"
              alt="profile"
            />
            <label className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full cursor-pointer shadow-md">
              <Camera size={14} />
            </label>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              {user.name}
              {isPremium && (
                <span className="text-amber-400 flex items-center gap-1 text-xs font-semibold bg-amber-950/70 border border-amber-800/60 px-2.5 py-0.5 rounded-full">
                  <Crown size={14} />
                  Premium
                </span>
              )}
            </h2>

            <p className="text-zinc-400 text-sm mt-1">{user.email}</p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800">
          {['overview', 'settings', 'premium'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-colors uppercase tracking-wider ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl">

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Account Name</p>
                <p className="text-lg font-bold text-white mt-1">{user.name}</p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-800 text-sm text-zinc-400">
                <span className="flex items-center gap-2 bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-800">
                  <Mail size={16} className="text-emerald-400" />
                  <span>{user.email}</span>
                </span>
                <span className="flex items-center gap-2 bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-800">
                  <MapPin size={16} className="text-emerald-400" />
                  <span>{user.location || 'Location Not Specified'}</span>
                </span>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={GetNewUserData} className="space-y-4 max-w-lg">
              <div>
                <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Full Name
                </label>
                <input
                  className="w-full bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 p-3 rounded-xl outline-none focus:border-emerald-500 text-sm transition-colors"
                  type="text"
                  placeholder="Enter Your Name" 
                  name="Name"
                  defaultValue={user.name}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Profile Image URL
                </label>
                <input
                  className="w-full bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 p-3 rounded-xl outline-none focus:border-emerald-500 text-sm transition-colors"
                  placeholder="Enter Your Image URL"
                  type="url" 
                  name="Image"
                  defaultValue={user.image}
                  required
                />
              </div>

              <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-emerald-950/40">
                {isSaved ? (
                  <span className="flex items-center gap-2">
                    <Check size={16} /> Saved
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </form>
          )}

          {/* PREMIUM */}
          {activeTab === 'premium' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Upgrade to Premium 👑
              </h2>

              <ul className="text-sm text-zinc-300 space-y-2">
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Unlimited recipe uploads</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Verified chef badge</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Priority recipe search listing</li>
              </ul>

              { user?.isPremium === 'Free' ? (
                <button
                  onClick={() => router.push('/plans')}
                  className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-amber-950/40"
                >
                  Upgrade to Premium
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 px-4 py-2 rounded-xl text-sm font-semibold">
                  <Check size={16} />
                  <span>You are already a Premium Member 🎉</span>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
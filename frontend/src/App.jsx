import React from 'react'
import { useState,useEffect } from 'react';
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx';
import {Routes,Route} from 'react-router-dom';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import { useAuthStore } from './store/useAuthStore.js';
import { Navigate } from 'react-router-dom';
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast';

const App = () => {
  const {authUser , checkAuth , isCheckingAuth , onlineUsers} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  console.log('onlineUsers : ',onlineUsers)
  console.log({authUser});

  if(isCheckingAuth && !authUser){
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  }

  return (
    <div   >
    
    <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: '#1E293B', // Slate-ish background
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '0.9rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
    success: {
      iconTheme: {
        primary: '#22c55e',
        secondary: '#fff',
      },
    },
    error: {
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    },
  }}
/>

    <Navbar/>
    <Routes>
      <Route path='/' element={authUser ?< HomePage/> :<Navigate to='/login' />}/>
      <Route path='/signup' element={!authUser ?< SignUpPage/>:<Navigate to='/' /> }/>
      <Route path='/login' element={!authUser ?< LoginPage/>:<Navigate to='/' />}/>
      {/* <Route path='/profile' element={authUser ?< ProfilePage/>:<Navigate to='/login' />}/> */}
      <Route path='/settings' element={< SettingsPage/>}/>
      <Route path='/profile' element={ < ProfilePage/>}/>

      
    </Routes>
    </div>
  )
}

export default App

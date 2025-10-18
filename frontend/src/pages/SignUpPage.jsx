import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, Mail, User, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: ''
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const { fullName, email, password } = formData;

    if (!fullName.trim()) {
      toast.error('Please enter your full name.');
      return false;
    }      

    if (!email.trim()) {
      toast.error('Email is required.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }

    if (!password.trim()) {
      toast.error('Password cannot be empty.');
      return false;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      signup(formData);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4'>
      <div className='bg-white shadow-2xl rounded-xl p-6 sm:p-8 w-full max-w-sm border border-gray-100
                      hover:shadow-blue-100 transition-all duration-300'>
        
        {/* Header Section */}
        <div className='text-center mb-6'>
          <div className='flex flex-col items-center gap-2 group'>
            <div className='size-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300'>
              <MessageSquare className='size-6 text-blue-600 group-hover:scale-110 transition-transform duration-300' />
            </div>
            <h1 className='text-2xl font-semibold text-gray-900 tracking-tight'>
              Create Account
            </h1>
            <p className='text-gray-500 text-sm'>
              Get started with your free account
            </p>
          </div>
        </div>

        {/* Form Section */}
        <form className='space-y-4' onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Full Name <span className='text-red-500'>*</span>
            </label>
            <div className='relative'>
              <User className='absolute left-3 top-2.5 text-gray-400 size-4' />
              <input
                type='text'
                name='fullName'
                placeholder='John Doe'
                className='w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition'
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email <span className='text-red-500'>*</span>
            </label>
            <div className='relative'>
              <Mail className='absolute left-3 top-2.5 text-gray-400 size-4' />
              <input
                type='email'
                name='email'
                placeholder='you@example.com'
                className='w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition'
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Password <span className='text-red-500'>*</span>
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-2.5 text-gray-400 size-4' />
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='••••••••'
                className='w-full pl-9 pr-9 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition'
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition'
              >
                {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
              </button>
            </div>
            <span className='text-xs text-gray-400'>
              Must be at least 6 characters
            </span>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isSigningUp}
            className={`w-full py-2 bg-blue-600 text-white font-medium rounded-md 
              hover:bg-blue-700 active:scale-[.98] transition-all duration-200 shadow-sm 
              hover:shadow-md ${isSigningUp ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSigningUp ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Footer */}
        <p className='text-center text-gray-500 text-xs mt-5'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600 font-medium hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage;

"use client";
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import React from 'react'
import { useRouter } from 'next/navigation';

const Vote = () => {
    const { isAuthenticated } = useContext(AuthContext)
    const router = useRouter()
    
    useEffect(() => {
    if (!isAuthenticated) {
        router.push('/');
    }
    })
    
  return (
    <div>Vote</div>
  )
}

export default Vote
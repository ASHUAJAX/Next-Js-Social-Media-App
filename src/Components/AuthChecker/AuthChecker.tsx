import React from 'react'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AuthChecker() {
  const router = useRouter();
  useEffect(() => {
    
    let isAuth = localStorage.getItem("user_ID");
    console.log(isAuth)
    if (!isAuth) {
      router.push("/login")
    }

  }, [])

  return (
    <>

    </>
  )
}

export default AuthChecker
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { ME } from '../apollo/queries';
import { ReturnedUser } from '../types';
import authHelper from './auth-helper';

interface MeQuery {
  me: ReturnedUser;
}



export default function useUser({redirectTo = '', redirectIfFound = false}) {
  const router = useRouter();
  const [me, { loading, data }] = useLazyQuery<MeQuery>(ME); //useLazyQuery so we can call it on useEffect and avoid it being called on prerender




  

  useEffect(() => {
    if(authHelper.isAuthenticated() === true) {
      me();
      if(redirectIfFound) {
        router.push(redirectTo);
      }
    } else if(redirectTo && !redirectIfFound) {
      router.push(redirectTo);
    }
    
  }, [me, redirectIfFound, redirectTo, router]);
  
  

  return { data, loading }

}
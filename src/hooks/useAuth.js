import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export const useAuth = () => {
   const context = useContext(AuthContext);

   if(!context){
    throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;

};

/*
  Hook to Check if current user has specific role
 */
export const useHasRole = (requiredRole) => {
  const {user} = useAuth();
  return haaAnyRole(user?.role , allowedRoles);
}


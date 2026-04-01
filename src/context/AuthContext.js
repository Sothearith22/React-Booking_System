import React, { createContext, useState } from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [authState ,setAuthState] = useState({ 
    user:null , 
    isAuthenicated :false, 
    loading:true});
}

const register = async (userData) => {
     // Simulate network delay
    await new Promise(resolve => setTimeout(resolve,1000));

    return { stats : "success", message : "User Register Successfully"};
}
return (
    <AuthContext.Provider value={{...authState , register}}>
        {children}
    </AuthContext.Provider>
)
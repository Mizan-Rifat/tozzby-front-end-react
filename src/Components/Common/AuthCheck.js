import React,{useState,useContext,useEffect} from 'react';
import {AppContext} from '../../App';

export default function AuthCheck() {

    const [authenticated,setAuthenticated] = useState(false);

    const {user,userLoading, setUser} = useContext(AppContext)


    useEffect(()=>{
        
        if(Object.entries(user).length > 0){
            setAuthenticated(true);
        }else{
            setAuthenticated(false);
        }
    },[user])

    return [authenticated,userLoading];
}

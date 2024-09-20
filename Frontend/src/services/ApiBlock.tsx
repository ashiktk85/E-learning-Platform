import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toast } from 'sonner';

const ApiBlock = () => {
    try {
        const {userInfo} = useSelector((state: RootState) => state.user)
        const isBlocked = localStorage.get("isBlocked'")

        console.log(isBlocked, "iss");
        

        if(isBlocked === "true") {
            toast.warning("Currently you are restricted.")
            return;
        }

    } catch (error : any) {
        
    }
}

export default ApiBlock;

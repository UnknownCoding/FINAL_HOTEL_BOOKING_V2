import {createContext, useContext, useState} from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client"
import {Stripe, loadStripe} from '@stripe/stripe-js';

type ToastMessage = {
    message: string;
    type: "SUCCESS"|"ERROR";
}

type AppContext = {
    showToast: (toastMsg:ToastMessage) => void,
    isLoggedIn:boolean,
    stripePromise:Promise<Stripe|null>
}

const AppContext = createContext<AppContext|undefined>(undefined);

const STRIPE_API_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || ""

const stripePromise = loadStripe(STRIPE_API_PUB_KEY);

export const AppContextProvider = ({children}:{children:React.ReactNode}) => {
    const [toast,setToast] = useState<ToastMessage|undefined>(undefined);
    const {isError} = useQuery("validateToken",apiClient.validateToken,{
        retry:false
    })
    return(
        <AppContext.Provider value={{showToast:(toastMessage)=>{setToast(toastMessage)},isLoggedIn:!isError,stripePromise:stripePromise}}>
            {toast && (<Toast message={toast.message} type={toast.type} onClose={()=>setToast(undefined)} />)}
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
}
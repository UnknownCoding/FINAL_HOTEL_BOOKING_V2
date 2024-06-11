import { RegisterFormData } from "./pages/Register";
import { SignInData } from "./pages/SignIn";
import {HotelType} from "../../backend/src/shared/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData:RegisterFormData) => {
    const res = await fetch(`${API_BASE_URL}/api/users/register`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    });
    const resBody = await res.json();
    if(!resBody.ok){
        throw new Error(resBody.message);   
    }
    return resBody;
}

export const signIn = async (formData:SignInData) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    });
    //TODO: fix this and inspect it 
    const resBody = await res.json();
    if(!res.ok){
        throw new Error(resBody.message);   
    }
    return resBody;
}

export const signOut = async () => {
    const res = await fetch(`${API_BASE_URL}/api/auth/logout`,{
        method:"POST",
        credentials:"include",
    });
    //TODO: fix this and inspect it 
    if(!res.ok){
        throw new Error("Error during signout");   
    }
}


export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        method:"GET",
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("Token invalid");   
    }
    return await response.json();
}

export const addMyHotel = async (hotelFormData:FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`,{
        method:"POST",
        credentials:"include",
        body:hotelFormData,
    });
    if(!response.ok){
        throw new Error("Failed to add hotel");   
    }
    return await response.json();
}

export const fetchMyHotels = async ()  => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/`,{
        method:"GET",
        // tell browser to send HTTP COOKIE
        credentials:"include",
    })
    const res = await response.json()
    if(!res.ok){
        throw new Error("Error fetching hotels")
    }
    return (res.hotels as HotelType[])
}

export const fetchMyHotelByID = async (hotelId:string) => {
        const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`,{
            method:"GET",
            credentials:"include"
        });
        const res = await response.json();
        if(!res.ok){
            throw new Error("Error in fetching this current hotel")
        }
        return (res.hotel as HotelType)
        // test on this catch error block
}

export const updateMyHotelByID = async (hotelFormData:FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelFormData.get("hotelId")}`,{
        method:"PUT",
        credentials:"include",
        body:hotelFormData
    })
    const res = await response.json()
    console.log(res)
    if(!res.ok){
        throw new Error("Failed to update hotel")
    }
    return res.hotel as HotelType
}   
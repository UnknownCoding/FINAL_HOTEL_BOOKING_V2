import { RegisterFormData } from "./pages/Register";
import { SignInData } from "./pages/SignIn";

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
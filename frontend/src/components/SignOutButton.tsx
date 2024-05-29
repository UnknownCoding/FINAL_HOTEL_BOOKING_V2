import * as apiClient from '../api-client'
import { useMutation, useQueryClient } from 'react-query'
import { useAppContext } from '../contexts/AppContext'

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const {showToast} = useAppContext();
    const mutation = useMutation(apiClient.signOut,{
        onSuccess:async ()=>{
            await queryClient.invalidateQueries("validateToken");
            showToast({message:"Signed Out!",type:"SUCCESS"});
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:"ERROR"});
        }
    })
    return (
        <button onClick={()=>{mutation.mutate()}} className='rounded-md cursor-pointer text-blue-600 px-3 font-bold bg-white hover:bg-gray-100'>
            Sign Out
        </button>
    )
}

export default SignOutButton
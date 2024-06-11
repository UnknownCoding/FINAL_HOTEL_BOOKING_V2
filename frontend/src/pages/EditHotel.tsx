import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../form/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
    const {id} = useParams();
    const {showToast} = useAppContext()
    const {data:hotel} = useQuery("fetchHotelByID",() =>apiClient.fetchMyHotelByID(id||''),{
        // truthy values
        enabled:!!id
    });
    const {mutate,isLoading} = useMutation(apiClient.updateMyHotelByID,{
        onSuccess:()=>{
            showToast({message:"Hotel Saved!",type:"SUCCESS"})
        },
        onError:()=>{
            showToast({message:"Error Saving Hotel!",type:"ERROR"})
        }
    });

    const handleSave = (formData:FormData) => {
        mutate(formData);
    }

    return (
        <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>
    )
}

export default EditHotel
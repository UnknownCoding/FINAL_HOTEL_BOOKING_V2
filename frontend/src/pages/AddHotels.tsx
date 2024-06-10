import { useMutation } from 'react-query'
import ManageHotelForm from '../form/ManageHotelForm'
import { useAppContext } from '../contexts/AppContext'
import * as apiClient from '../api-client';

const AddHotels = () => {
    const {showToast} = useAppContext()
    const {mutate,isLoading} = useMutation(apiClient.addMyHotel,{
        onSuccess:() => {
            showToast({message:"Hotel Saved!",type:"SUCCESS"});
        },
        onError:()=>{
            showToast({message:"Error saving the hotel",type:"ERROR"});
        }
    })

    const handleSave = (formData:FormData) => {
        mutate(formData);
    }

    return (
        <ManageHotelForm isLoading={isLoading} onSave={handleSave}/>
    )
}

export default AddHotels
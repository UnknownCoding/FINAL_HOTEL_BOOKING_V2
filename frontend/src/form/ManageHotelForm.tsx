import { FormProvider, useForm } from 'react-hook-form';
import DetailSection from './ManageHotel/DetailSection';
import TypeSection from './ManageHotel/TypeSection';
import FacilitiesSection from './ManageHotel/FacilitiesSection';
import GuestsSection from './ManageHotel/GuestsSection';
import ImageSection from './ManageHotel/ImageSection';
import { HotelType } from '../../../backend/src/shared/types';
import { useEffect } from 'react';

export interface HotelFormData{
    name:string;
    city:string;
    country:string;
    description:string;
    type:string;
    adultCount:number;
    childCOunt:number;
    facilities:string[];
    pricePerNight:number;
    starRating:number;
    imageUrls:string[];
    imageFiles:FileList;
}

interface MnageHotelInterface{
    hotel?:HotelType
    onSave:(hotelFormData:FormData) => void,
    isLoading:boolean

}

const ManageHotelForm = ({isLoading,onSave,hotel}:MnageHotelInterface) => {
    const formMethods = useForm<HotelFormData>();
    const {handleSubmit,reset} = formMethods;
    useEffect(()=>{
        reset(hotel)
    },[hotel,reset]);
    const onSubmit = handleSubmit((formDataJSON:HotelFormData)=>{
        // turn to a multipart form becuase we CANNOT send a normal file in JSON notation
        const formData = new FormData();
        if(hotel){
            formData.append("hotelId",hotel._id)
        }
        formData.append("name",formDataJSON.name);
        formData.append("city",formDataJSON.city);
        formData.append("country",formDataJSON.country);
        formData.append("description",formDataJSON.description  );
        formData.append("type",formDataJSON.type);
        formData.append("pricePerNight",formDataJSON.pricePerNight.toString());
        formData.append("adultCount",formDataJSON.adultCount.toString());
        formData.append("childCOunt",formDataJSON.childCOunt.toString());
        formData.append("starRating",formDataJSON.starRating.toString());
        formDataJSON.facilities.forEach((facility,index)=>{
            formData.append(`facilities[${index}]`,facility);
        });

        if(formDataJSON.imageUrls){
            formDataJSON.imageUrls.forEach((url,idx)=>{
                formData.append(`imageUrls[${idx}]`,url);
            });
        }

        // File list doesnt allow for each so convert it to an array
        Array.from(formDataJSON.imageFiles).forEach((imgFile)=>{
            // we deal with binary data so no need specifiy array it works it's self out
            formData.append(`imageFiles`,imgFile)
        });
        onSave(formData);
    })
    return (
        <FormProvider {...formMethods}>
            <form className='flex flex-col gap-10' onSubmit={onSubmit}>  
                <DetailSection/>
                <TypeSection/>
                <FacilitiesSection/>
                <GuestsSection/>
                <ImageSection/>
                <span className='flex justify-end'>
                    <button disabled={isLoading} type='submit' className='disabled:bg-gray-500 bg-blue-600 rounded-md text-white p-2 font-bold hover:bg-blue-500 text-xl'>
                        {isLoading ? "Saving":"Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}

export default ManageHotelForm
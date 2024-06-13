import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../form/GuestInfoForm/GuestInfoForm";

const Details = () => {
    const {id} = useParams();
    const {data:hotelData} = useQuery(["fetchHotelById",id],()=>{
        return apiClient.fetchHotelById(id || "")
    },{
        enabled:!!id
    })
    if(!hotelData){
        return <></>
    }
    return (
        <div className="space-y-6">
            <div>
                <span className="flex items-center space-x-2">
                    {Array.from({length:hotelData.starRating}).map(()=>(
                        <AiFillStar className="text-yellow-400"/>
                    ))}
                </span>
                <h1 className="font-bold text-3xl">
                    {hotelData.name}
                </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {hotelData.imageUrls.map((img)=>(
                    <div className="h-[300px]">
                        <img src={img} alt="" className="h-full rounded-sm w-full object-cover object-center"/>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                {hotelData.facilities.map((fac,i)=>(
                    <div key={i} className="border border-slate-300 rounded-sm p-3">
                        {fac}
                    </div>
                ))}
            </div>
            {/* left taking 2/3 while other taking 1/3 */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                {/* breaks text into a new line */}
                <div className="whitespace-pre-line">
                    {hotelData.description}
                </div>
                <div className="h-fit">
                    <GuestInfoForm pricePerNight={hotelData.pricePerNight} hotelId={hotelData._id}/>
                </div>
            </div>
        </div>
    )
}

export default Details
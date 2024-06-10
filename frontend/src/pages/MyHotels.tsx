import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import * as apiClient from '../api-client'
import {BsBuilding, BsMap} from "react-icons/bs"
import {BiHotel, BiMoney, BiStar} from "react-icons/bi"

const MyHotels = () => {
    const {data:hotelData} = useQuery("fetchMyHotels",apiClient.fetchMyHotels,{
        onError:()=>{
            console.log("error fetching the data")
        }
    })
    if(!hotelData) return <><h1>No Hotels Found</h1></>
    return (
        <div className='space-y-5'>
            <span className='flex justify-between'>
                <h1 className='text-3xl font-bold'>My Hotels</h1>
                <Link to="/add-hotel" className='rounded-md flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500'>Add Hotel</Link>
            </span>
            <div className='grid grid-cols-1 gap-8'>
                {hotelData?.map((hotels,idx)=>(
                    <div key={idx} className='flex flex-col border border-slate-300 rounded-lg p-8 gap-5'>
                        <h2 className='text-2xl font-bold'>{hotels.name}</h2>
                        {/* prevent overflow */}
                        <div className='whitespace-pre-line'>{hotels.description}</div>
                        <div className='grid grid-cols-3 gap-2'>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BsMap className='mr-3'/>
                                {hotels.city}, {hotels.country}
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BsBuilding className='mr-3'/>
                                {hotels.type}
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BiMoney className='mr-3'/>
                                AED {hotels.pricePerNight} per night
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BiHotel className='mr-3'/>
                                {hotels.adultCount} adults, {hotels.childCOunt} children
                            </div>
                            <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                                <BiStar className='mr-2'/>
                                {hotels.starRating} Star Rating 
                            </div>
                        </div>

                        <span className='flex justify-end'>
                            <Link to={`/edit-hotel/${hotels._id}`} className='rounded-md flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500'>
                                View Details
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyHotels
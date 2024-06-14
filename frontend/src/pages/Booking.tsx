import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../form/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const Booking = () => {
    const {data:currentUser} = useQuery("fetchUser",apiClient.fethcCurrentUser);
    const search = useSearchContext();
    const [numNights,setNumNights] = useState<number>(0);    
    const {id} = useParams();
    const {stripePromise} = useAppContext();

    const {data:HotelData} = useQuery(["fetchHotelByID",id],() => apiClient.fetchHotelById(id as string),{
        enabled:!!id
    });
    const {data:paymentIntentData} = useQuery("createPaymentIntent",()=>apiClient.createPaymentIntent(id as string,numNights.toString()),{
        enabled:!!id && numNights > 0
    })

    useEffect(()=>{
        if(search.checkIn && search.checkOut){
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime())/(1000*60*60*24);
            setNumNights(Math.ceil(nights));
        }
    },[search.checkIn,search.checkOut])

    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_2fr]">
            {HotelData && (
                <BookingDetailSummary hotel={HotelData} numberOfNights={numNights}  checkIn={search.checkIn} checkOut={search.checkOut} adultCount={search.adultCount} childCount={search.childCount} />
            )}
            {currentUser && paymentIntentData && (
                <Elements stripe={stripePromise} options={{
                    clientSecret: paymentIntentData.clientSecret,
                }}>
                    <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData}/>
                </Elements>
            )}
        </div>
    )
}

export default Booking
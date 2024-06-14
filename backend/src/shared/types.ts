export interface HotelType{
    _id:string;
    userId:string;
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
    lastUpdated:Date;
    bookings:BookingType[];
}


export interface HotelSearchResponse{
    data:HotelType[];
    pagination:{
        total:number,
        page:number,
        pages:number,
    };
    ok:boolean
}

export type BookingType = {
    _id:string;
    userId:string;
    firstName:string;
    lastName:string;
    email:string;
    adultCount:number;
    childCount:number;
    checkIn:Date;
    checkOut:Date;
    totalCost:number;
}


export interface PaymentIntentResponse{
    paymentIntentId:string;
    clientSecret:string;
    totalCost:number;
}
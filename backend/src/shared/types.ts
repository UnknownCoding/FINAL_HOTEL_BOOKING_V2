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
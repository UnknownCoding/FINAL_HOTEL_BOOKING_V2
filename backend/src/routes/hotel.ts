import Hotel from "../models/hotels";
import express, { Request, Response } from "express"
import { BookingType, HotelSearchResponse } from "../shared/types";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";


const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_API_KEY as string);




router.get("/search",async (req:Request,res:Response)=>{
    try {
        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
        const skip = (pageNumber-1) *pageSize;
        
        const query = constructQuery(req.query);

        let sortOptions = {};
        switch(req.query.sortOptions){
            case "starRating":
                sortOptions = {starRating:-1};
                break;
            case "pricePerNightAsc":
                sortOptions = { pricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortOptions = { pricePerNight: -1 };
                break;
        }

        const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize);
        const total = await Hotel.countDocuments(query);

        const response:HotelSearchResponse = {
            data:hotels,
            pagination:{
                total,
                page:pageNumber,
                pages:Math.ceil(total/pageSize)
            },
            ok:true
        };
        res.status(201).json(response);
    } catch (error) {
        console.log("error: ",error)
        res.status(501).json({message:"Something went wrong",ok:false});
    }
})

const constructQuery = (queryParams:any) => {
    let constructQuery:any = {};

    if(queryParams.destination){
        constructQuery.$or = [
            { city: new RegExp(queryParams.destination, "i") },
            { country: new RegExp(queryParams.destination, "i") },
        ]
    };

    if(queryParams.adultCount){
        constructQuery.adultCount = {
            $gte:parseInt(queryParams.adultCount)
        }
    }

    if(queryParams.childCOunt){
        constructQuery.childCOunt = {
            $gte:parseInt(queryParams.childCOunt)
        }
    }

    if(queryParams.facilities){
        constructQuery.facilities = {
            $all:Array.isArray(queryParams.facilities) ? queryParams.facilities : [queryParams.facilities]
        }
    }

    if(queryParams.type){
        // in, works best with an array 
        constructQuery.type = {
            $in:Array.isArray(queryParams.type) ? queryParams.type : [queryParams.type]
        }
    }

    if(queryParams.stars){
        const starRatings = Array.isArray(queryParams.stars) ?  queryParams.stars.map((star:string)=>{
            return parseInt(star);
        }):[parseInt(queryParams.stars)];

        constructQuery.starRating = {
            $in:starRatings
        }
    }

    if(queryParams.maxPrice){
        constructQuery.pricePerNight = {
            $lte:parseInt(queryParams.maxPrice)
        }
    }

    return constructQuery

}

router.get("/:id",[param("id").notEmpty().withMessage("Hotel ID is required")],async(req:Request,res:Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ok:false,errors:errors.array()})
    };
    const id = req.params.id;
    try {
        const hotel = await Hotel.findById(id);
        res.status(201).json({hotel,ok:true});
    } catch (error) {
        console.log(error);
        res.status(400).json({errors:errors.array(),ok:false});
    }
})

router.post("/:hotelId/bookings",verifyToken,async (req:Request,res:Response)=>{
    try {
        const paymentIntentID  = req.body.paymentIntentId;
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentID as string);
        if(!paymentIntent){
            return res.status(400).json({message:"payment intent not found",ok:false});
        };
        if(paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.userId){
            return res.status(400).json({message:"payment intent mismatch"});
        }
        if(paymentIntent.status !== "succeeded"){
            return res.status(400).json({message:`payment intent not succeeded. Status: ${paymentIntent.status} `,ok:false});
        }
        const {paymentIntentId,...mainData} = req.body
        const newBooking:BookingType = {
            ...mainData,userId:req.userId
        }
        const hotel = await Hotel.findOneAndUpdate({_id:req.params.hotelId},{
            $push:{
                bookings:newBooking
            }
        })
        if(!hotel){
            return res.status(400).json({message:"hotel not found",ok:false});
        }
        await hotel.save();
        res.status(201).json({ok:true});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"unknown error occured ",ok:false});
    }
})

router.post("/:hotelId/bookings/payment-intent",verifyToken,async (req:Request,res:Response)=> {

    const {numberOfNights} = req.body;
    const hotelId = req.params.hotelId;
    try {
        const hotel = await Hotel.findById(hotelId);
        if(!hotel){
            return res.status(400).json({message:"Hotel not found ",ok:false});
        }
        const totalCost = hotel.pricePerNight * numberOfNights;
        const paymentIntent = await stripe.paymentIntents.create({
            amount:totalCost*100,
            currency:"aed",
            metadata:{
                hotelId,
                userId:req.userId
            }
        });
        if(!paymentIntent.client_secret){
            return res.status(500).json({message:"error creating a payment intent",ok:false});
        }
        const response = {
            paymentIntentId:paymentIntent.id,
            clientSecret:paymentIntent.client_secret.toString(),
            totalCost,
        };
        res.status(201).json({response,ok:true});
    } catch (error) {
        res.status(500).json({message:"unknown error occured",ok:false});
    };


})



export default router
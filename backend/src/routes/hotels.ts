import express,{Request,Response} from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel from '../models/hotels';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';
import { HotelType } from '../shared/types';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024
    }
});

router.post('/',verifyToken,[
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and should be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities are required"),

],upload.array("imageFiles",6),async (req:Request,res:Response)=>{
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel:HotelType = req.body;
        const imageUrls = await cloudinaryImages(imageFiles);

        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        const hotel = new Hotel({...newHotel});
        await hotel.save();
        res.status(201).send(hotel);

    } catch (error) {
        console.log("Error creating hotel: ",error);
        res.status(500).json({message:"Something went wrong"});
    }
});


router.get('/',verifyToken,async (req:Request,res:Response)=>{
    try {
        const hotels = await Hotel.find({
            userId:req.userId
        })
        res.status(201).json({hotels,ok:true})    
    } catch (error) {
        res.status(500).json({message:"Error fetching hotels",ok:false})
    }
});


router.get("/:id",verifyToken,async(req:Request,res:Response)=>{
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne({
            _id:id,
            userId:req.userId
        });
        res.status(201).json({hotel,ok:true})
    } catch (error) {
        res.status(500).json({message:"Error fetching the hotel",ok:false});
    }

});

router.put("/:id",verifyToken,upload.array("imageFiles"),async (req:Request,res:Response)=>{
    try {
        const updatedHotel:HotelType = req.body;
        updatedHotel.lastUpdated = new Date();
        const hotel = await Hotel.findOneAndUpdate({
            _id:req.params.id,
            userId:req.userId
        },updatedHotel,{new:true})

        // we post update it becuase in the end we would save it with the changes to file , we do it in this manner to check if hotel 
        // exist , prescisely to not waste any time
        if(!hotel){
            return res.status(404).json({message:"Hotel not found"});
        }
        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await cloudinaryImages(files);
        hotel.imageUrls = [...updatedImageUrls,...(updatedHotel.imageUrls||[])];
        await hotel.save();
        res.status(201).json({hotel,ok:true})

    } catch (error) {
        res.status(500).json({message:"Error in updating the hotel",ok:false})
    }
});


async function cloudinaryImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (img) => {
        const b64 = Buffer.from(img.buffer).toString("base64");
        let dataURI = "data:" + img.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router;

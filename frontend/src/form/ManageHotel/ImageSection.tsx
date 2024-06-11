import { useFormContext } from "react-hook-form"
import { HotelFormData } from "../ManageHotelForm"

const ImageSection = () => {
    const {register,formState:{errors},watch,setValue} = useFormContext<HotelFormData>()
    const existingImageURLs = watch('imageUrls')
    const handleDelete = (e:React.MouseEvent<HTMLButtonElement>,imageUrl:string) => {
        e.preventDefault()
        setValue("imageUrls",existingImageURLs.filter((url)=>
            url != imageUrl
        ))
    }
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 gap-4">
                {existingImageURLs && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageURLs.map((image,idx)=>(                                        
                            <div key={idx} className="relative group">
                                <img src={image} className="min-h-full object-cover"/>
                                <button onClick={(event)=>handleDelete(event,image)} className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">Delete</button>
                            </div>
                        ))}
                    </div>
                )}
                
                <input className="w-full text-gray-700 bg font-normal" type="file" multiple accept="image/*" {...register("imageFiles",{
                    validate:(imageFiles) =>{
                        const totalLength = imageFiles.length + (existingImageURLs?.length || 0);
                        if(totalLength == 0){
                            return "At least one image should be added";
                        }else if(totalLength > 6){
                            return "Total number of images cannot be more than 6";
                        }
                        return true;
                    }
                })}/>
            </div>
            {errors.imageFiles && (
                <span className="text-red-500 text-sm font-bold">
                    {errors.imageFiles?.message}
                </span>
            )}
        </div>
    )
}

export default ImageSection
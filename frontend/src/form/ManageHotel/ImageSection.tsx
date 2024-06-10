import { useFormContext } from "react-hook-form"
import { HotelFormData } from "../ManageHotelForm"

const ImageSection = () => {
    const {register,formState:{errors}} = useFormContext<HotelFormData>()
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 gap-4">
                <input className="w-full text-gray-700 bg font-normal" type="file" multiple accept="image/*" {...register("imageFiles",{
                    validate:(imageFiles) =>{
                        const totalLength = imageFiles.length;
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
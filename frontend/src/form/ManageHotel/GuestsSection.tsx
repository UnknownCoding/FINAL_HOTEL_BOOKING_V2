import { useFormContext } from "react-hook-form"
import { HotelFormData } from "../ManageHotelForm"

const GuestsSection = () => {
    const {formState:{errors},register} = useFormContext<HotelFormData>()
    return (
        <div>
            <h2 className="font-bold text-2xl">Guests</h2>
            <div className="gap-5 flex p-6 bg-gray-300">
                    <label className="flex-1">
                        Adults
                        <input min={1} type="number" className="border rounded py-2 px-3 w-full" {...register("adultCount",{required:"This field is required"})} />
                        {errors.adultCount && (
                            <span className='text-red-500 text-sm font-bold'>
                                {errors.adultCount.message}
                            </span>
                        )}
                    </label>
                    <label className="flex-1">
                        Child
                        <input min={0} type="number" className="border rounded py-2 px-3 w-full" {...register("childCOunt",{required:"This field is required"})}/>
                        {errors.childCOunt && (
                            <span className='text-red-500 text-sm font-bold'>
                                {errors.childCOunt.message}
                            </span>
                        )}
                    </label>
            </div>
        </div>
    )
}

export default GuestsSection
import { hotelTypes } from "../config/hotel-options-config";

type Props = {
    selectedHotelTypes:string[];
    onChange:(event:React.ChangeEvent<HTMLInputElement>) => void
}

const HotelTypesFilter = ({selectedHotelTypes,onChange}:Props) => {
    return (
        <div className="border-b border-b-slate-300 pb-5">
            <h4 className="font-semibold text-md mb-2 ">Hotel Types</h4>
            {hotelTypes.map((hotel)=>(
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm" value={hotel} checked={selectedHotelTypes.includes(hotel)} onChange={onChange} />
                    <span> 
                        {hotel}    
                    </span>
                </label>
            ))}
        </div>
    )
}

export default HotelTypesFilter
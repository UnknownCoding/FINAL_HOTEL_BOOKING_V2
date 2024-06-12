import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
    selectedHotelFacilities:string[];
    onChange:(event:React.ChangeEvent<HTMLInputElement>) => void
}

const HotelFacilitiesFilter = ({onChange,selectedHotelFacilities}:Props) => {
    return (
        <div className="border-b border-b-slate-300 pb-5">
            <h4 className="font-semibold text-md mb-2 ">Hotel Facilities</h4>
            {hotelFacilities.map((fac)=>(
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm" value={fac} checked={selectedHotelFacilities.includes(fac)} onChange={onChange} />
                    <span> 
                        {fac}    
                    </span>
                </label>
            ))}
        </div>
    )
}

export default HotelFacilitiesFilter
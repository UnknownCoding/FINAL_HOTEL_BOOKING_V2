import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const search = useSearchContext();
    const navigate = useNavigate()

    // this is all for performance , if we change using searchContext ALOT of rerenders so performance drops below
    const [destination,setDestination] = useState<string>(search.destination);
    const [checkIn,setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut,setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount,setAdultCount] = useState<number>(search.adultCount);
    const [childCount,setChildCount] = useState<number>(search.childCount);

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        search.saveSearchValues(destination,checkIn,checkOut,adultCount,childCount);
        navigate('/search');
    };
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear()+1)
    return (
        <form onSubmit={handleSubmit} className="-mt-8  p-3 bg-orange-400 rounded-md shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4 ">
            <div className="flex items-center rounded-l-md bg-white p-2">
                <MdTravelExplore size={25} className="mr-2"/>
                <input placeholder="Where are you going?" className="w-full text-md focus:outline-none " value={destination} onChange={(e) => setDestination(e.target.value)}/>
            </div>
            <div className="flex bg-white items-center px-2 py-1 gap-2">
                <label className="flex items-center">
                    Adults: 
                    <input className=" p-1 w-full focus:outline-none font-bold" type="number" min={1} max={20} value={adultCount} onChange={(e) => setAdultCount(parseInt(e.target.value))}/>
                </label>
                <label className="flex items-center">
                    Children: 
                    <input className="p-1 w-full focus:outline-none font-bold" type="number" min={0} max={20} value={childCount} onChange={(e) => setChildCount(parseInt(e.target.value))}/>
                </label>
            </div>
            <div>
                <DatePicker 
                    selected={checkIn} 
                    onChange={(date)=> setCheckIn(date as Date)} 
                    selectsStart 
                    startDate={checkIn} 
                    endDate={checkOut} 
                    minDate={minDate} 
                    maxDate={maxDate}
                    placeholderText="Check-in Date"
                    className="min-w-full bg-white p-2 focus:outline-none"
                    wrapperClassName="min-w-full"
                    />
            </div>
            <div>
                <DatePicker 
                    selected={checkOut} 
                    onChange={(date)=> setCheckOut(date as Date)} 
                    selectsStart 
                    startDate={checkIn} 
                    endDate={checkOut} 
                    minDate={minDate} 
                    maxDate={maxDate}
                    placeholderText="Check-out Date"
                    className="min-w-full bg-white p-2 focus:outline-none"
                    wrapperClassName="min-w-full"
                    />
            </div>
            <div className="flex gap-1 w-full col-span-2 xl:col-span-1">
                <button className="bg-blue-600 flex-1 text-white p-2 w-2/3 font-bold text-xl hover:bg-blue-500">
                    Search 
                </button>
                <button className="bg-red-600 rounded-r-md text-white p-2 w-1/3 font-bold text-xl hover:bg-red-500">
                    Clear 
                </button>
            </div>
        </form>
    )
}

export default SearchBar
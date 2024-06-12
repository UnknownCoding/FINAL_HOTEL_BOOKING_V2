import { useQuery } from 'react-query';
import { useSearchContext } from '../contexts/SearchContext';
import * as apiClient from "../api-client";
import { useState } from 'react';
import SearchResultCard from '../components/SearchResultCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFilter';
import HotelTypesFilter from '../components/HotelTypesFilter';
import HotelFacilitiesFilter from '../components/HotelFacilitiesFilter';
import PriceFilter from '../components/PriceFilter';

const Search = () => {
    const search = useSearchContext();
    const [page,setPage] = useState<number>(1);
    const [selectedStars,setSelectedStars] = useState<string[]>([]);
    const [selectedHotelTypes,setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedHotelFacilities,setSelectedHotelFacilities] = useState<string[]>([]);
    // drop downs already have a default value 
    const [selectedPrice,setSlectedPrice] = useState<number|undefined>();
    const [sortOption,setSortOption] = useState<string>("");

    const searchParams = {
        destination:search.destination.toString(),
        checkIn:search.checkIn.toISOString(),
        checkOut:search.checkOut.toISOString(),
        adultCount:search.adultCount.toString(),
        childCount:search.childCount.toString(),
        page:page.toString(),
        stars:selectedStars,
        type:selectedHotelTypes,
        facilities:selectedHotelFacilities,
        maxPrice:selectedPrice?.toString(),
        sortOptions:sortOption
    }

    const onChangeStars = (e:React.ChangeEvent<HTMLInputElement>) => {
        const starRating = e.target.value;
        setSelectedStars((prevStars)=>e.target.checked ? [...prevStars,starRating]: [...prevStars].filter((star)=> star !== starRating))
    }

    const onChangeHotelTypes = (e:React.ChangeEvent<HTMLInputElement>) => {
        const hotelType = e.target.value;
        setSelectedHotelTypes((prevHotelTypes)=>e.target.checked ? [...prevHotelTypes,hotelType]: [...prevHotelTypes].filter((hotelT)=> hotelT !== hotelType))
    }

    const onChangeHotelFacilities = (e:React.ChangeEvent<HTMLInputElement>) => {
        const hotelFac = e.target.value;
        setSelectedHotelFacilities((prevHotelFac)=>e.target.checked ? [...prevHotelFac,hotelFac]: [...prevHotelFac].filter((hotelF)=> hotelF !== hotelFac))
    }



    const {data:hotelData} = useQuery(["searchHotels",searchParams],()=> apiClient.searchHotel(searchParams))

    return (
        // this lg:grid-cols-[250px_1fr] means that TWO columns with ONE being 250PX and other taking the rest of the space
        <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
            <div className='rounded-lg border border-slate-300 p-5 h-fit sticky top-10'>
                <div className='space-y-3'>
                    <h3 className='text-lg font-semibold border-b border-slate-300 pb-5 '>Filter by:</h3>
                    <StarRatingFilter selectedStars={selectedStars} onChange={onChangeStars}/>
                    <HotelTypesFilter onChange={onChangeHotelTypes} selectedHotelTypes={selectedHotelTypes}/>
                    <HotelFacilitiesFilter onChange={onChangeHotelFacilities} selectedHotelFacilities={selectedHotelFacilities} />
                    <PriceFilter onChange={(value?:number)=>setSlectedPrice(value)} selectedPrice={selectedPrice} />
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                    <span className='text-xl font-bold'>
                        {hotelData?.pagination.total} Hotels found 
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                    <select className="p-2 rounded-md cursor-pointer focus:outline-none border" value={sortOption} onChange={(e)=>setSortOption(e.target.value)}>
                        <option value="">
                            Select Max Price
                        </option>
                        <option value="starRating">
                            Star Rating
                        </option>
                        <option value="pricePerNightAsc">
                            Price Per Night (low to high)
                        </option>
                        <option value="pricePerNightDesc">
                            Price Per Night (high to low)
                        </option>
                    </select>

                </div>
                {hotelData?.data.map((hotel)=>(
                    <SearchResultCard hotel={hotel}/>
                ))}
                <div className={`${hotelData?.data.length == 0 ? 'mt-auto' : ''}`}>
                    <Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} onPageChange={(page)=>setPage(page)}/>
                </div>
            </div>
        </div>
    )
}

export default Search
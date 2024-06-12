

type Props = {
    selectedStars:string[];
    onChange:(event:React.ChangeEvent<HTMLInputElement>) => void
}

const StarRatingFilter = ({onChange,selectedStars}:Props) => {
    let starsArray:string[] = ["1","2","3","4","5"]
    return (
        <div className="border-b border-b-slate-300 pb-5">
            <h4 className="font-semibold text-md mb-2 ">Property Rating</h4>
            {starsArray.map((star)=>(
                <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-sm" value={star} checked={selectedStars.includes(star)} onChange={onChange} />
                    <span> 
                        {star} Stars    
                    </span>
                </label>
            ))}
        </div>
    )
}

export default StarRatingFilter
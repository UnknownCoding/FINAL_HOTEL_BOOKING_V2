

type Props = {
    selectedPrice:number|undefined;
    onChange:(value?:number) => void
}

const PriceFilter = ({selectedPrice,onChange}:Props) => {
    return (
        <div>
            <h4 className="text-md font-semibold mb-2">Max Price</h4>
            <select className="p-2 rounded-md cursor-pointer focus:outline-none border" value={selectedPrice} onChange={(e)=>onChange(e.target.value ? parseInt(e.target.value) : undefined)}>
                <option value="">
                    Select Max Price
                </option>
                {[50,500,1000,1500,5000].map((price)=>(
                    <option value={price}>
                        {price}
                    </option>                
                ))}
            </select>
        </div>
    )
}

export default PriceFilter
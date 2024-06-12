

export type Props ={
    page:number;
    pages:number;
    onPageChange:(page:number) => void;
}

const Pagination = ({onPageChange,page,pages}:Props) => {
    const pageNumber = [];
    for(let i=1;i<=pages;i++){
        pageNumber.push(i);
    }
    return (
        <div className="flex justify-center">
            <ul className="flex border border-slate-300">
                {pageNumber.map((num)=>(
                    <li className={`px-2 py-1 ${page == num ? "bg-gray-200" : ""}`}>
                        <button onClick={()=>onPageChange(num)}>
                            {num}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination
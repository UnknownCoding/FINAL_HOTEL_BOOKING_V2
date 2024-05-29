
const Footer = () => {
    return (
        <div className='bg-blue-800 py-10 w-full'>
            <div className='mainComponent mx-auto flex justify-between items-center'>
                <span className='text-3xl text-white font-bold tracking-tight'>
                    GeelyHolidays
                </span>
                <span className='text-white font-bold tracking-tight flex gap-4'>
                    <p className='cursor-pointer'>Privacy Policy</p>
                    <p className='cursor-pointer'>Terms of service</p>
                </span>
            </div>
        </div>
    )
}

export default Footer
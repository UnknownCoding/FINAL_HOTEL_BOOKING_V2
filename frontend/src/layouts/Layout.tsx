import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar';

interface Props{
    children: React.ReactNode;
}

const Layout = ({children}:Props) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header/>
            <Hero/>
            <div className='mainComponent mx-auto !max-w-[1500px]'>
                <SearchBar/>
            </div>
            <div className='w-full mx-auto mainComponent py-10 flex-1'>
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout   
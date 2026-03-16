import Image from 'next/image'
import React from 'react'
import bg from "@/assets/footer-bg.png"
import plane from "@/assets/plane.png"
import { LucideFacebook } from 'lucide-react'
import Link from 'next/link'

function Footer() {

  const getCurrentYear = () => {
    const currentDate = new Date();
    return currentDate.getFullYear()
  }
  return (
    <div className='w-screen h-[70vh] relative'>
        <div className="absolute inset-0 w-full h-full -z-10">
            <Image 
            src={bg.src}
            alt='asman ki uchiyo me'
            width={bg.width}
            height={bg.height}
            className='w-full h-full object-cover'
            />
        </div>
        <div className="relative flex items-center justify-center w-full h-auto flex-col">
            <h1 className='font-streach text-[12rem] uppercase text-center text-white'>skybblue</h1>
        <div className="absolute h-[28rem] top-10 w-1/2">
            <Image 
            src={plane.src}
            alt='flying plane'
            fill
            />
        </div>
        </div>
        <div className="w-full h-3/5 mt-12 bg-linear-180 from-black/20 to-white/80 backdrop-blur-[6px] p-10 relative">
        <div className="flex justify-between items-start w-full ">
            <p className='font-syne font-bold text-2xl text-white w-1/3'>Fly beyond commercial limits with SkyAero. A private jet booking experience crafted for elite travelers who demand precision, privacy, and prestige.</p>
            <div className="">
                <h1 className='font-streach uppercase text-4xl text-white'>Contact us</h1>

                <p className='font-syne text-xl font-bold text-right mt-6 text-white'>info@skyblue.aero</p>
                <p className='font-syne text-xl font-bold text-right mt-2 text-white'>9086345xx2</p>
                <div className="flex justify-end mt-6 items-end gap-3">

                    <div className="w-12 h-12 bg-white rounded-full grid place-items-center">
                        <LucideFacebook 
                            size={20}
                            color='black'
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full h-1/4 z-50 absolute bottom-0 left-0">
            <div className="flex justify-start items-center gap-4 px-8">
                <Link href={"/"} className='font-syne text-xl uppercase font-bold'>ABOUT US</Link> <span className='font-syne text-3xl font-semibold'>|</span>
                <Link href={"/"} className='font-syne text-xl uppercase font-bold'>privacy policy</Link>  <span className='font-syne text-3xl font-semibold'>|</span>
                <Link href={"/"} className='font-syne text-xl uppercase font-bold'>terms & conditions</Link>  <span className='font-syne text-3xl font-semibold'>|</span>
                <Link href={"/"} className='font-syne text-xl uppercase font-bold'>refund policy</Link> 
            </div>

            <div className="flex justify-between px-8 items-center mt-6">
                <p className='font-syne font-semibold text-xl'>© {getCurrentYear()} All copyright are reserved.</p>
                <div className="w-1/2 border border-black"></div>
                <p className='font-sans font-normal text-xl'>Designed by <Link href={"https://arinova.studio"} className='font-syne font-bold'>Arinova Studio</Link> X <Link href="https://outrightcreators.com" className='font-syne font-bold'>Outright Creators</Link></p>
            </div>
        </div>
        </div>

    </div>
  )
}

export default Footer
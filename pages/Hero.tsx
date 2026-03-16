import React from 'react'
import Image from 'next/image'
import background from "@/assets/sky-bg.png"
import cloud from "@/assets/cloud.png"
import LiquidGlass from '@/elements/LiquidGlass'
import Button from '@/elements/Button'
import { Plane } from 'lucide-react'


function Hero() {
  return (
    <div className='min-h-screen h-screen w-screen relative'>
        <Image 
        src={background.src}
        alt='Sky background'
        fill
        className='absolute w-full h-full -z-10'
        />        
        <div className='relative z-10 flex flex-col items-center justify-center h-full text-center px-4 mb-'>
            <h1 className='font-streach uppercase text-white text-[12.5rem] pb-12'>Skybblue</h1>
            <div className="w-full h-2/3 absolute bottom-0">
            <h1 className='font-streach uppercase [-webkit-text-stroke:4px_#ffffff] text-transparent relative text-[12.5rem] mt-0 z-50 text-center'>Skybblue</h1>
            <Image 
            src={cloud.src}
            alt='cloud'
            fill
            />
            </div>
            <div className="absolute bottom-12 z-999">
              <LiquidGlass className='p-1'>
                <div className="flex justify-center items-center gap-2">
                <Button className='px-5 py-3.5'>
                  Plan a flight
                </Button>
                <Button className='p-4' varient={"dark"}>
                  <Plane size={18} />
                </Button>
                </div>
              </LiquidGlass>
            </div>
        </div>
    </div>
  )
}

export default Hero
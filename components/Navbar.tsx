import LiquidGlass from '@/elements/LiquidGlass';
import Link from 'next/link'
import React from 'react'
import logo from "@/assets/logo.png";
import Image from 'next/image';
import Button from '@/elements/Button';
import { LucideArrowRight } from 'lucide-react';


interface PillProps {
    children: React.ReactNode;
    Action?: () => void;
    Visit?: string;
    className?: string;
}

function PillComponent({ children, Action, Visit, className }: Readonly<PillProps>) {
    return (
        <LiquidGlass className={`${className} px-8 py-3`}>
        {Visit ? (
            <Link href={Visit}>
                {children}
            </Link>
        ) : (
        <button onClick={Action}>
            {children}
        </button>)}
        </LiquidGlass>
    )
}

function Navbar() {
  const options = [
    {
        name: "Trip support",
        link: "#"
    },
        {
        name: "Brokerage",
        link: "#"
    },
        {
        name: "Maintainance",
        link: "#"
    },
        {
        name: "crew leasing",
        link: "#"
    },
  ]

  return (
    <div className='flex w-screen justify-between items-center absolute top-6 px-10 z-9999'>
        <PillComponent Visit='/'>
            <Image
                src={logo.src}
                alt='SkyBlue Logo'
                width={100}
                height={100}
            />
        </PillComponent>
        <LiquidGlass className="flex justify-center items-center px-10 py-4 gap-12">
        {
            options.map((opt) => (
                    <Link
      href={opt.link}
      key={opt.name}
      className="group font-roxter text-white uppercase mx-6 inline-block perspective-[1000px]"
    >
      {opt.name.split("").map((char, i) => (
        <span
          key={i}
          className="
          inline-block
          transition-[transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)]
          group-hover:rotate-x-360
          "
          style={{
            transitionDelay: `${i * 60}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Link>
            ))
        }
        </LiquidGlass>
        <PillComponent Visit='/' className='pl-4 py-0 pr-3'>
        <div className="flex items-center justify-center gap-4">
            <p className='uppercase font-sans font-medium text-white text-xl'>Contact us</p>
            <Button className='p-2.5'>
                <LucideArrowRight 
                size={21}
                color='#000000'
                className='-rotate-45'
                />
            </Button>
        </div>
        </PillComponent>
    </div>
  )
}

export default Navbar
import React from 'react'
import LiquidGlass from './LiquidGlass';

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onPress?: () => void;
    varient?: "light" | "dark"
}


function Button({ children, className = "", onPress, varient = "light" }: Readonly<ButtonProps>) {
  return (
        <button className={`rounded-full ${varient === "light" ? "bg-white text-slate-900" : "bg-slate-900 text-white"} ${className}`} onClick={onPress}>
        <p className='font-roxter'>{children}</p>
    </button>
  )
}

export default Button
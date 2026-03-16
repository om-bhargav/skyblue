"use client";
import React, { useState } from 'react'

function Faq() {
    const faqData = [
        {
            question: "What is SkyBlue?",
            answer: "SkyBlue is a revolutionary platform that offers an unparalleled flying experience."
        },
        {
            question: "How can I book a flight with SkyBlue?",
            answer: "Booking a flight with SkyBlue is easy! Simply visit our website, select your desired destination and dates, and follow the prompts to complete your booking."
        },
        {
            question: "What makes SkyBlue different from other airlines?",
            answer: "SkyBlue stands out for its commitment to sustainability, exceptional customer service, and innovative technology that enhances the flying experience."
        },
        {
            question: "Can I change or cancel my booking?",
            answer: "Yes, you can change or cancel your booking. Please refer to our cancellation policy for more details and any applicable fees."
        }
    ]

    const clients = [
        {
            id: 1,
            name: "Adani",
            logo: "https://picsum.photos/1080/1080"
        },
                {
            id: 2,
            name: "Adani",
            logo: "https://picsum.photos/1080/1080"
        },
        
                {
            id: 3,
            name: "Adani",
            logo: "https://picsum.photos/1080/1080"
        },
        
                {
            id: 4,
            name: "Adani",
            logo: "https://picsum.photos/1080/1080"
        },
        
                {
            id: 5,
            name: "Adani",
            logo: "https://picsum.photos/1080/1080"
        },
        
                {
            id: 6,
            name: "Adani",
            logo: "https://picsum.photos/1080/1080"
        },
        
                {
            id: 7,
            name: "Adani",
            logo: "https://picsum.photos/1080/1080"
        },
        
    ]
    const [isOpen, setIsOpen] = useState<null | number>(null)

  return (
    <div className='w-screen h-screen flex justify-start items-center flex-col py-20'>
        <div className="w-5/6 h-[80%] flex justify-between items-start">
            <div className="w-[55%] h-full">
                <h1 className='uppercase font-roxter text-5xl text-gray-300'>skyblue</h1>
                <p className='uppercase font-syne text-lg text-gray-600 font-bold'>A BETTER WAY TO FLY</p>

                <div className="flex flex-col justify-start items-start gap-8 mt-10">
                    {
                        faqData.length > 0 && faqData.map((item, i) => (
                    <div key={i} className={`w-full h-auto py-6 ${isOpen === i ? 'max-h-96' : 'max-h-24'} transition-all duration-500 ease-in-out cursor-pointer border-b-2 border-gray-200`} onClick={() => setIsOpen(isOpen === i ? null : i)}>
                        <div className="flex justify-between items-center">
                        <h2 className='font-syne font-bold text-2xl text-gray-900'>{item.question}</h2>
                        <p className='font-syne uppercase font-bold text-4xl'>+</p>
                        {/* <LucidePlus className='text-gray-900' size={28} strokeWidth={4} /> */}
                        </div>
                        <p className={`transition-all text-lg mt-4 duration-300 ease-in-out ${isOpen === i ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>{item.answer}</p>
                    </div>
                        ))
                    }
                </div>
            </div>

            <div className="w-2/5 h-full flex justify-center items-center">
                <div className="w-5/6 h-5/6 bg-gray-200">
                {/* Message for Dev = replace this with Image tag from "next/image" */}
                <img src={"https://picsum.photos/1080/1080"} alt='Imran khan' className='w-full h-full object-cover'/>
            
            </div>
            </div>
        </div>

        {/* Clients section */}
        <h1 className='font-streach uppercase text-5xl text-center'>our clieents</h1>

        <div className="flex flex-nowrap justify-between items-center gap-6 mt-10 w-full px-4">
                {
                    clients.length > 0 && clients.map((item, i) => (
                        <div key={item.id + i} className="w-full h-36 bg-red-400">
                            <img src={item.logo} alt={item.name} className='w-full h-full object-cover' />
                        </div>
                    ))
                }
        </div>
    </div>
  )
}

export default Faq
"use client"

import { useState } from "react"
import Image from "next/image"
import { CarProps } from "@/types"
import CustomBtn from "./CustomBtn"
import { calculateCarRent, generateCarImageUrl } from "@/utils"
import CarDetailes from "./CarDetailes"

interface CarCardPropos{
    car: CarProps
}

const CarCard = ( { car }: CarCardPropos ) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
 
    const {city_mpg, year, make, model, transmission, drive} = car;

    const catRent = calculateCarRent(city_mpg, year);

  return (
    <div className="car-card group" >
              <div className="car-card_container-title" >
                       <h2 className="car-card__content-title" >
                             {make} {model}
                       </h2>
              </div>

              <p className="flex mt-6 text-[32px] font-extrabold" >
                 <span className="self-start text-[14px] font-semibold" > $ </span>
                               {catRent}
                 <span className="self-end text-[14px] font-medium" > /day </span>
              </p>

              <div className="relative w-full h-40 my-3 object-contain" >
                    <Image src={generateCarImageUrl(car)} alt="car model" fill priority  className="object-contain" />
              </div>

              <div className="relative flex w-full mt-2" >
                        <div className="flex group-hover:invisible w-full text-gary justify-between" >
                                <div className="flex flex-col justify-center items-center gap-2" >
                                        <Image src="steering-wheel.svg" alt="steering wheel" width={20} height={20} />
                                        <p className="text-[14px]" > {transmission === "a" ? "Automatic" : "Manual"} </p>
                                </div>

                                <div className="flex flex-col justify-center items-center gap-2" >
                                        <Image src="tire.svg" alt="tire" width={20} height={20} />
                                        <p className="text-[14px]" > {drive.toUpperCase()} </p>
                                </div>

                                <div className="flex flex-col justify-center items-center gap-2" >
                                        <Image src="gas.svg" alt="gas" width={20} height={20} />
                                        <p className="text-[14px]" > {city_mpg} MPG </p>
                                </div>
                        </div>

                        <div className="car-card__btn-container" >
                                <CustomBtn 
                                    title="View More"
                                    containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                                    textStyles = "text-white text-[14px] leading-[17px] font-bold"
                                    rightIcon = "/right-arrow.svg"
                                    handleClick={() => setIsOpen(true)}
                                 />
                        </div>
              </div>

              <CarDetailes isOpen={isOpen} closeModel={() => setIsOpen(false)} car={car} />
    </div>
  )
}

export default CarCard
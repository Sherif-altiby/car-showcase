"use client"

import { Fragment, useState } from "react"
import { Combobox, Transition } from "@headlessui/react"
import Image from "next/image"

import { SearchManufactuererProps } from "@/types"
import { manufacturers } from "@/constants";


const SearchManufatuerer = ({manufactuerer, setManufactuerer}: SearchManufactuererProps) => {
  
  const [query, setQuery] = useState<string>("")

  const filteredManufacturers = query === "" 
               ? manufacturers 
               : manufacturers.filter((item) => (item
                .toLowerCase()
                .replace(/\s+/g , "")
                .includes(query
                .toLowerCase()
                .replace(/\s+/g, ""))))

  return (
    <div className="search-mabufacurer" >
              <Combobox value={manufactuerer} onChange={setManufactuerer} >
                  <div className="w-full relative" >
                            <Combobox.Button className="absolute top-[14px]" >
                                           <Image src="/car-logo.svg" alt="car-logo" width={20} height={20} className="ml-4" />
                            </Combobox.Button>
                            <Combobox.Input className="search-manufacturer__input"
                                placeholder="Volkswagen"
                                displayValue={(manufacturer: string) => manufacturer}
                                onChange={(e) => setQuery(e.target.value) }
                            />
                            <Transition 
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQuery("")}
                            >

                                 <Combobox.Options>
                                    {
                                      filteredManufacturers.map((item) => (
                                                              <Combobox.Option
                                                                  value={item}
                                                                  key={item}
                                                                  className={({active}) => `relative search-manufacturer__option
                                                                   ${active ? `bg-primary-blue text-white` : `text-gray-900`}`}
                                                              >
                                                                  {item}
                                                              </Combobox.Option>
                                      ))
                                    }
                                 </Combobox.Options>

                            </Transition>
                  </div>
              </Combobox>
    </div>
  )
}

export default SearchManufatuerer
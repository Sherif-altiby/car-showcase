"use client"

import { useState } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";

import SearchManufatuerer from "./SearchManufatuerer";


const SearchButton = ( {otherClasses}: {otherClasses: string} ) => (
  <button type = "submit" className={`-ml-3 z-10 ${otherClasses}`} >
        <Image src="/magnifying-glass.svg" alt="magnifying image" width={40} height={40} className="object-contain" />
  </button>
)

const SearchBar = () => {

    const [manufacturere, setManufactuerer] = useState<string>("")
    const [model, setModel] =useState<string>("")

    const router = useRouter()


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if(manufacturere === "" && model === "") { return alert("Please Fill The Search Bar") }

      updateSearchParams(model.toLowerCase(), manufacturere.toLowerCase())
    }

    const updateSearchParams = (model: string, manufacturere: string) => {
          const searchParams = new URLSearchParams(window.location.search)

          if(model){ searchParams.set("model", model) } else {searchParams.delete("model")}
          if(manufacturere){ searchParams.set("manufacturere", manufacturere) } else {searchParams.delete("manufacturere")}

          const pathName = `${window.location.pathname}?${searchParams.toString()}`

          router.push(pathName, {scroll: false})
    }

  return (
    <form className="searchbar" onSubmit={handleSubmit} >
               <div className="searchbar__item" > 
                      <SearchManufatuerer manufactuerer={manufacturere} setManufactuerer={setManufactuerer} />
                      <SearchButton otherClasses="sm:hidden" />
               </div>
               <div className="searchbar__item" >
                      <Image src="/model-icon.png" alt="car model" width={25} height={25} className="absolute w-[20px] h-[20px] ml-4" />
                      <input type="text" name="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Tiguan" className="searchbar__input" />
                      <SearchButton otherClasses="sm:hidden" />
               </div>
                      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  )
}

export default SearchBar
"use client"

import { ShowMoreProps } from "@/types"
import { useRouter } from "next/navigation"
import CustomBtn from "./CustomBtn"
import { updateSearchParams } from "@/utils"

const ShowMore = ( {pageNumber, isNext}: ShowMoreProps ) => {
 
    const router = useRouter();

    const handleNvigation = () => {
            const limit = (pageNumber + 1) * 10
            const newPathName = updateSearchParams("limit", `${limit}`);

            router.push(newPathName, {scroll: false})
    }

  return (
    <div className="w-full flex-center gap-5 mt-10" >
        {!isNext && (
            <CustomBtn title="Show More" btnTybe="button" containerStyles="bg-primary-blue text-white rounded-full" handleClick={handleNvigation} />
        )}
    </div>
  )
}

export default ShowMore
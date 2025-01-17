import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";

export default async function Home( { searchParams }: { searchParams: any} ) {
  
  const allCars = await fetchCars({
    manufacturere: searchParams.manufacturere || '' ,
    model: searchParams.model || '' ,
    year: searchParams.year || 2022 ,
    fuel: searchParams.fuel || '' ,
    limit: searchParams.limit || 10 
  })
 
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  

  return (
    <main className="overflow-hidden">
       <Hero />

       <div className="mt-12 padding-x padding-y max-width" id="discover" >
                 <div className="home__text-container" >
                           <h1 className="text-4xl font-extrabold" > Car Catalogue </h1>
                           <p> Explore the car you might like. </p>
                  </div>  
                  <div className="home__filters" > 
                            <SearchBar />

                            <div className="home__filter-container" >
                                      <CustomFilter title="fuel" options={fuels} />
                                      <CustomFilter title="year" options={yearsOfProduction} />
                            </div>
                  </div>

                  {!isDataEmpty ? (
                    <section>
                      <div className="home__cars-wrapper" >
                                {allCars.map((car) => (
                                  <CarCard car={car} />
                                ))}
                      </div>

                      <ShowMore pageNumber={(searchParams.limit || 10) / 10}  isNext={(searchParams.limit || 10) > allCars.length} />
                    </section>
                  ): (
                    <h2> Oops, There is no results </h2>
                  )}
       </div>
    </main>
  );
}

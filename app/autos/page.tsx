import CarsCard from "@/components/cars/CarsCard";
import CarsPagination from "@/components/cars/CarsPagination";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

async function carsCount() {
  return await prisma.car.count({
    where: {
      status: false
    }
  })
}

async function getCars(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize

  const products = await prisma.car.findMany({
    where: {
      status: false
    },
    include: {
        images: true
    },
    take: pageSize,
    skip: skip
  })
  return products 
}

export default async function AutosPage({searchParams}: {searchParams: Promise<{ page?: string }>}) {

  const params = await searchParams;

  const page = Number(params.page ?? "1");
  
  const pagex = page || 1
  const pageSize = 18

  if(pagex < 0 ) redirect('/')

  const carsData = await getCars(pagex, pageSize)
  const totalCarsData = carsCount()
  const [ cars, totalCars ] = await Promise.all([carsData, totalCarsData])
  const totalPages = Math.ceil(totalCars / pageSize)

  return (
    <>
      <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold my-4 mx-2 text-black text-center">Catálogo de vehículos</h1>
      <div className="grid grid-cols-1 mt-2 mx-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-start xl:mx-10 xl:mt-5">
          {cars.map(car => (
            <CarsCard key={car.id} car={car}/>
          ))}
      </div>
      <CarsPagination page={pagex} totalPages={totalPages} link={'/autos'}/>
    </>
  )
}

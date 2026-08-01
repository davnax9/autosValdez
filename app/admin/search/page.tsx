import CarSearchForm from "@/components/cars/CarSearchForm"
import CarsTable from "@/components/cars/CarsTable"
import GoStore from "@/components/ui/GoStore"
import prisma from "@/lib/prisma"

async function searchCars(searchCar: string) {
    const cars = await prisma.car.findMany({
        where: {
            OR: [
                {
                    marca: {
                        contains: searchCar,
                        mode: 'insensitive'
                    },
                },
                {
                    modelo: {
                        contains: searchCar,
                        mode: 'insensitive'
                    }
                }
            ]
        }
    })
    return cars
}

export default async function page({searchParams}: {searchParams: Promise<{ search?: string }>}) {

  const {search = ""} = await searchParams
  const cars = await searchCars(search)

  return (
    <>
        <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold my-4 mx-2 text-black text-center">Resultados de búsqueda: {search}</h1>
        <div className="flex justify-end">
            <GoStore />
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
            <CarSearchForm />
        </div>

        {cars.length ? <CarsTable cars={cars} /> : <p className="text-center text-lg">No hay resultados</p>}
    </>
  )
}

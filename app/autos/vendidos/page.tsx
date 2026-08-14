import CarsCard from "@/components/cars/CarsCard";
import CarsPagination from "@/components/cars/CarsPagination";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function carsCount() {
  return await prisma.car.count({
    where: {
      status: true
    }
  })
}

async function getCars(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize

  const products = await prisma.car.findMany({
    where: {
      status: true
    },
    include: {
        images: true
    },
    take: pageSize,
    skip: skip
  })
  return products 
}

export default async function page({searchParams}: {searchParams: Promise<{ page?: string }>}) {

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
      <div className="relative flex items-center justify-center my-4 mx-2">
        <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold my-4 mx-2 text-black text-center">Vehículos Vendidos</h1>
        <Link href="/autos" className="absolute right-0 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-bold text-sm sm:text-base">
            Catálogo
        </Link>
      </div>

      {cars.length === 0 && (
        <>
            <p className="text-sm md:text-xl lg:text-2xl font-bold my-4 mx-2 text-black text-center">A raíz de inicio de plataforma no hay vehiculos vendidos. Para ver catalogo ir a {''}
                <a href="https://www.facebook.com/luismartin.valdezhernandez" className="text-blue-600" target="_blank" rel="noopener noreferrer">facebook</a>
            </p>
        </>
      )}

      {cars.length > 0 && (
        <>
            <p className="text-sm md:text-xl lg:text-2xl font-bold my-4 mx-2 text-black text-center">Existe la posibilidad de que no todos los vehículos vendidos esten en esta plataforma, para ver mas acceder a {''}
                <a href="https://www.facebook.com/luismartin.valdezhernandez" className="text-blue-600" target="_blank" rel="noopener noreferrer">facebook</a>
            </p>
        </>
      )}

      <div className="grid grid-cols-1 mt-2 mx-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-start xl:mx-10 xl:mt-5">
          {cars.map(car => (
            <CarsCard key={car.id} car={car}/>
          ))}
      </div>
      <CarsPagination page={pagex} totalPages={totalPages} link={'/autos'}/>
    </>
  )
}

import CarsCard from "@/components/cars/CarsCard";
import Title from "@/components/ui/Title";
import prisma from "@/lib/prisma";

async function getCars() {
  const products = await prisma.car.findMany({
    where: {
      status: false
    }
  })
  return products 
}

export default async function AutosPage() {

  const cars = await getCars()

  return (
    <>
      <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold my-4 mx-2 text-black text-center">Catálogo de vehículos</h1>
      <div className="grid grid-cols-1 mt-2 mx-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-start xl:mx-10 xl:mt-5">
          {cars.map(car => (
            <CarsCard key={car.id} car={car}/>
          ))}
      </div>
    </>
  )
}

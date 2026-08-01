import CarSearchForm from "@/components/cars/CarSearchForm";
import CarsPagination from "@/components/cars/CarsPagination";
import CarsTable from "@/components/cars/CarsTable";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import GoStore from "@/components/ui/GoStore";

async function carsCount() {
  return await prisma.car.count()
}

async function getCars(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize

  const cars = await prisma.car.findMany({
    take: pageSize,
    skip: skip
  })
  return cars
}

export default async function page({searchParams}: {searchParams: Promise<{ page?: string }>}) {

  // const {page = 1} = await searchParams
  const params = await searchParams;

  const page = Number(params.page ?? "1");

  const pagex = page || 1
  const pageSize = 20

  if(pagex < 0 ) redirect('/admin')

  const carsData = await getCars(pagex, pageSize)
  const totalCarsData = carsCount()
  const [ cars, totalCars ] = await Promise.all([carsData, totalCarsData])
  const totalPages = Math.ceil(totalCars / pageSize)

  if(pagex > totalPages) redirect('/admin')

  return (
    <>
        <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold my-2 mx-2 text-black text-center">Panel de administración</h1>
        <GoStore />
        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
            <Link href={'/admin/cars'} className="bg-red-600 hover:bg-red-700 w-full rounded-lg lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer text-white">Agregar vehículo</Link>
            <CarSearchForm />
        </div>

        <CarsTable cars={cars} />
        <CarsPagination page={pagex} totalPages={totalPages} link={'/admin'}/>
    </>
  )
}

import CarForm from "@/components/cars/CarForm";
import EditCarForm from "@/components/cars/EditCarForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getCarById(id: number){
    const car = await prisma.car.findUnique({
        where: {
            id: id
        },
        include: {
            images: true
        }
    })

    if(!car){
        notFound()
    }

    return car
}

export default async function page({params}: { params: Promise<{ id: string }>}) {

  const {id = 0} = await params

  const car = await getCarById(+id)

  return (
    <>
        <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold my-4 mx-2 text-black text-center">Editar Vehículo</h1>

        {/* <GoBackButton /> */}

        <EditCarForm>
            <CarForm car={car} />
        </EditCarForm>
    </>
  )
}

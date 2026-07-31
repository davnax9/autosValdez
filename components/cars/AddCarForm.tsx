"use client"

import { createCar } from "@/actions/create-cars-action"
import { CarSchema } from "@/src/schemas"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function AddCarForm({children}: {children: React.ReactNode}) {

  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    const data = {
        marca: formData.get('marca'),
        modelo: formData.get('modelo'),
        anio: formData.get('anio'),
        precio: formData.get('precio'),
        info: formData.get('info'),
        image: formData.get('image')
    }
    // const result = CarSchema.safeParse(data)

    // console.log(result)

    // if(!result.success){
    //     result.error.issues.forEach(issue => {
    //         toast.error(issue.message)
    //     })
    //     return 
    // }

    const response = await createCar(data)
    if(response?.errors){
        response.errors.forEach(issue => {
            toast.error(issue.message)
        })
        return 
    }

    toast.success('Vehiculo creado correctamente')
    router.push('/admin')
  }

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
        <form action={handleSubmit} className="space-y-5">
            {children}
            <div className="flex justify-between items-center gap-4">
                <input type="submit" className="bg-red-600 hover:bg-red-700 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg" value='Registrar Vehículo' />
                {/* <input type="button" className="bg-gray-500 hover:bg-gray-600 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg" value='Cancelar' /> */}
                <Link href={"/admin"} className="text-center bg-gray-500 hover:bg-gray-600 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg">Cancelar</Link>
            </div>
        </form>
    </div>
  )
}

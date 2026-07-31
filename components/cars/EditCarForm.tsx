"use client"

import { updateCar } from "@/actions/edit-cars-action"
import { CarSchema } from "@/src/schemas"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"


export default function EditCarForm({children}: {children: React.ReactNode}) {

  const router = useRouter()

  const params = useParams()
  const id = +params.id!

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

    // if(!result.success){
    //     result.error.issues.forEach(issue => {
    //         toast.error(issue.message)
    //     })
    //     return 
    // }

    const response = await updateCar(data, id)
    if(response?.errors){
        response.errors.forEach(issue => {
            toast.error(issue.message)
        })
        return 
    }

    toast.success('Vehículo actualizado correctamente')
    router.push('/admin')

  }

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
        <form action={handleSubmit} className="space-y-5">
            {children}
            <div className="flex justify-between items-center gap-4">
                <input type="submit" className="bg-red-600 hover:bg-red-800 rounded-lg text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer" value='Editar Vehículo' />
                <Link href={"/admin"} className="text-center bg-gray-500 hover:bg-gray-600 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg">Cancelar</Link>
            </div>
        </form>
    </div>
  )
}

"use client"

import { Car } from "@/src/generated/prisma/client"
import { formatCurrency } from "@/src/utils"
import { PencilSquareIcon, TrashIcon, EyeIcon, CheckIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"
import CarInfoModal from "./CarInfoModal"
import { updateStatusCar } from "@/actions/update-carstatus-action"
import { deleteCar } from "@/actions/delete-car-action"

type CarsTableProps = {
    cars: Car[]
}

export default function CarsTable({cars}: CarsTableProps) {

  const [isOpen, setIsOpen] = useState(false)
  const [carInfo, setCarInfo] = useState("")

  const handleModal = async(paymentMethod: string) => {
    setIsOpen(false)
  }

  const handleDeleteClick = async(id: number) => {
    const confirmed = window.confirm(
        `¿Estás seguro que deseas eliminar el vehículo?`
    )

    if (!confirmed) return

    const result = await deleteCar(id)

    if (!result.success) {
        toast.error("No se pudo eliminar el vehículo")
        return
    }

    toast.success("Vehículo eliminado correctamente")
  }

  const handleMarkClick = async(id:number) => {
    const upd = await updateStatusCar(id)
    if(!upd.success){
        toast.error('Imposible actualizar estatus de vehiculo')
    } else {
        toast.success('Estatus del vehiculo actualizado')
    }
    
  }

  return (
    <>
        <div className="px-4 sm:px-6 lg:px-8 mt-10">
            <div className="mt-8 flow-root ">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Marca
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Modelo
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Año
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Precio
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Estatus
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Fecha de venta
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Acciones</span>Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {cars.map(car => (
                                    <tr key={car.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {car.marca}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {car.modelo}
                                        </td> 
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {car.anio}
                                        </td> 
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {formatCurrency(car.precio)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {car.status === true ? 'Vendido' : 'Inventario'}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {car.fechaVenta ? car.fechaVenta.toLocaleDateString("es-MX") : "---"}
                                        </td>
                                        <td className="whitespace-nowrap py-4 px-4">
                                            <div className="flex justify-center gap-3">
                                                <EyeIcon className='w-4 h-4 text-green-600 hover:text-green-800' onClick={() => {
                                                    setIsOpen(true)
                                                    setCarInfo(car.info)
                                                }}/>
                                                <Link href={`/admin/cars/${car.id}/edit`} className="text-indigo-600 hover:text-indigo-800">
                                                    <PencilSquareIcon className='w-4 h-4' />
                                                </Link>
                                                {!car.fechaVenta && (
                                                    <CheckIcon onClick={() => handleMarkClick(car.id)} className='w-4 h-4 text-amber-500 hover:text-amber-600' />
                                                )}
                                                <button onClick={() => handleDeleteClick(car.id)} className="text-red-600 hover:text-red-800">
                                                    <TrashIcon className='w-4 h-4' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <CarInfoModal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onConfirm={handleModal}
            carInfo={carInfo}
        />
    </>
  )
}

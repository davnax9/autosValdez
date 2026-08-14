"use client"

import { Dialog, DialogPanel } from "@headlessui/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { formatCurrency } from "@/src/utils"

type CarImage = {
    id: number
    url: string
}

type CarImagesModalProps = {
    car: {
        marca: string
        modelo: string
        anio: string
        precio: number
        info: string
        images: CarImage[]
    }
    isOpen: boolean
    onClose: () => void
}

export default function CarImagesModal({ car, isOpen, onClose} : CarImagesModalProps) {

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0)
        }
    }, [isOpen])

    if (car.images.length === 0) {
        return null
    }

    const currentImage = car.images[currentIndex]

    const nextImage = () => {
        setCurrentIndex((prev) =>
            prev === car.images.length - 1 ? 0 : prev + 1
        )
    }

    const previousImage = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? car.images.length - 1 : prev - 1
        )
    }

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/80" aria-hidden="true"/>
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="relative w-full max-w-5xl">
                    <button type="button" onClick={onClose} className="absolute right-2 top-2 z-20 rounded-full bg-black/60 p-2 text-white hover:bg-black/80">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                    <div className="relative w-full h-[60vh]">
                        <Image src={currentImage.url} alt={`Imagen ${currentIndex + 1}`} fill className="object-contain" priority/>
                        {car.images.length > 1 && (
                            <button type="button" onClick={previousImage} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-black/80">
                                <ChevronLeftIcon className="w-7 h-7" />
                            </button>
                        )}

                        {car.images.length > 1 && (
                            <button type="button" onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-black/80">
                                <ChevronRightIcon className="w-7 h-7" />
                            </button>
                        )}
                    </div>

                    <div className="text-center text-white mt-2">
                        {currentIndex + 1} / {car.images.length}
                    </div>

                    <div className="flex gap-3 mt-4 overflow-x-auto justify-center">
                        {car.images.map((image, index) => (
                            <button key={image.id} type="button" onClick={() => setCurrentIndex(index)} className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                    index === currentIndex ? "border-white" : "border-transparent opacity-60"
                                }`}
                            >
                                <Image src={image.url} alt={`Miniatura ${index + 1}`} fill className="object-cover"/>
                            </button>
                        ))}
                    </div>

                    {/* <div className="bg-white rounded-b-lg p-6">

                        <h2 className="text-2xl font-black text-gray-800">
                            {car.marca} {car.modelo}
                            <span className="text-base font-normal ml-2">
                                ({car.anio})
                            </span>
                        </h2>

                        <p className="mt-3 text-gray-600 leading-relaxed">
                            {car.info}
                        </p>

                        <p className="mt-4 text-2xl font-bold text-amber-500">
                            {formatCurrency(car.precio)}
                        </p>

                    </div> */}
                </DialogPanel>
            </div>
        </Dialog>
    )
}
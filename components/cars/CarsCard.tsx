import { Car, Prisma } from "@/src/generated/prisma/client"
import { formatCurrency, getImagePath } from "@/src/utils"
import Image from "next/image"
import WhatsAppButton from "../whatsapp/WhatsAppButton"

type CarWithImages = Prisma.CarGetPayload<{
    include: {
        images: true
    }
}>

type CarsCardProps = {
    car: CarWithImages
}

export default function CarsCard({car}: CarsCardProps) {

  // const imagePath = getImagePath(car.images[0]?.url)
  const imagePath = car.images[0]?.url

  return (
    <div className="border shadow-lg rounded-lg">
        <div className="overflow-hidden">
          {imagePath && (
            <Image width={600} height={500} src={imagePath} alt={`Imagen de ${car.modelo}`} className="hover:scale-125 transition-transform hover:rotate-2" />
          )}
        </div>

        <div className="p-2 text-center">
            <h2 className="text-xl font-black">{car.marca}-{car.modelo}<span className="text-sm">({car.anio})</span></h2>
            <p className="text-gray-600 text-justify pt-3">{car.info}</p>
            <h2 className="text-xl text-amber-500 pt-2">{formatCurrency(car.precio)}</h2>
            <WhatsAppButton car={car}/>
        </div>
    </div>
  )
}

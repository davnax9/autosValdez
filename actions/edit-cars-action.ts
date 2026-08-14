"use server"

import prisma from "@/lib/prisma"
import { CarSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

export async function updateCar(data: unknown, id: number){
    const result = CarSchema.safeParse(data)

    if(!result.success){
        return {
            errors: result.error.issues
        }
    }

    const { images, ...carData } = result.data

    await prisma.$transaction(async (tx) => {

        // 1. Actualizar información del vehículo
        await tx.car.update({
            where: {
                id
            },
            data: carData
        })

        // 2. Eliminar las imágenes actuales
        await tx.carImage.deleteMany({
            where: {
                carId: id
            }
        })

        // 3. Crear nuevamente las imágenes actuales
        await tx.carImage.createMany({
            data: images.map(url => ({
                url,
                carId: id
            }))
        })
    })

    revalidatePath("/admin")
    revalidatePath("/autos")

    return {
        success: true
    }
}
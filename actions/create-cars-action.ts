"use server"

import prisma from "@/lib/prisma"
import { CarSchema } from "@/src/schemas"

export async function createCar(data: unknown) {
    const result = CarSchema.safeParse(data)
    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }

    const { images, ...carData } = result.data

    await prisma.car.create({
        data: {
            ...carData,

            images: {
                create: images.map(url => ({
                    url
                }))
            }
        }
    })

    return {
        success: true
    }
}
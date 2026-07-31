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

    await prisma.car.create({
        data: result.data
    })
}
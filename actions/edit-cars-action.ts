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

    await prisma.car.update({
        where: {
            id: id
        },
        data: result.data
    })
}

revalidatePath('/admin')
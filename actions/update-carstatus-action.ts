"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateStatusCar(id: number){
    try {
        await prisma.car.update({
            where: {
                id: id
            },
            data: {
                status: true,
                fechaVenta: new Date()
            }
        })

        return {
            success: true
        }
    } catch (error) {
        return {
            success: false
        }
    }
}

revalidatePath('/admin')
"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteCar(id: number) {
    try {
        await prisma.car.delete({
            where: {
                id: id
            }
        })
    
        revalidatePath("/admin")
    
        return {
            success: true
        }
        
    } catch (error) {
        return {
            success: false,
        }
    }
}
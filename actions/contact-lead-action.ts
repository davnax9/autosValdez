"use server";

import prisma from "@/lib/prisma";

type ContactLeadData = {
    name: string;
    phone: string;
    email?: string;
    message: string;
    carId: number;
}

export async function createContactLead(data: ContactLeadData) {
    try {
        const contactLead = await prisma.contact.create({
            data: {
                name: data.name,
                phone: data.phone,
                email: data.email || null,
                message: data.message,
                carId: data.carId
            }
        })

        return {
            success: true,
            data: contactLead
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "No fue posible guardar la información"
        }
    }
}
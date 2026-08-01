"use client";

import { createContactLead } from "@/actions/contact-lead-action";
import { Car } from "@/src/generated/prisma/client";
import { contactLeadSchema } from "@/src/schemas";
import { generateWhatsAppMessage, generateWhatsAppUrl } from "@/src/utils/whatsapp";
import { useState } from "react";
import { toast } from "react-toastify";

type WhatsAppFormProps = {
    car: Car
    onClose: () => void
}

export default function WhatsAppForm({ car, onClose }: WhatsAppFormProps) {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validacion = contactLeadSchema.safeParse(formData)

        if(!validacion.success){
            //console.log(validacion.error.flatten().fieldErrors)

            const errors = validacion.error.flatten().fieldErrors;


            Object.values(errors).forEach((error) => {

                if(error){
                    toast.error(error[0]);
                }

            });

            return
        }
        
        const result = await createContactLead({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            carId: car.id
        });
        
        if(result.success){
            const whatsappMessage = generateWhatsAppMessage({
                car,
                name: formData.name,
                phone: formData.phone,
                message: formData.message
            })

            const whatsappUrl = generateWhatsAppUrl(
                whatsappMessage
            )

            window.open(
                whatsappUrl,
                "_blank"
            )

            setTimeout(() => {
                onClose();
            }, 500);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Información del vehículo */}
            <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-bold text-lg text-gray-800">{car.marca} {car.modelo}</h3>
                <p className="text-gray-600">Año: {car.anio}</p>
                <p className="text-gray-600">Precio: ${car.precio.toLocaleString()}</p>
            </div>

            {/* Nombre */}
            <div>
                <label htmlFor="name" className="block font-medium text-gray-700">Nombre</label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Nombre completo"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
            </div>
            {/* Teléfono */}
            <div>
                <label htmlFor="phone" className="block font-medium text-gray-700">Teléfono</label>
                <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Ej. 6671234567"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
            </div>
            {/* Email */}
            <div>
                <label htmlFor="email" className="block font-medium text-gray-700">Email (opcional)</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="correo@email.com"
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
            </div>
            {/* Mensaje */}
            <div>
                <label htmlFor="message" className="block font-medium text-gray-700">Duda o comentario</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Ej. Me interesa, quisiera saber si manejan financiamiento..."
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"/>
            </div>
            {/* Botón */}
            <button type="submit" className="w-full rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold py-3 transition">
                Continuar a WhatsApp
            </button>
        </form>
    )
}
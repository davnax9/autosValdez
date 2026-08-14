import { Car } from "@/src/generated/prisma/client";
import { formatCurrency } from ".";

type WhatsAppMessageProps = {
    car: Car;
    name: string;
    phone: string;
    message: string;
}

export function generateWhatsAppMessage({ car, name, phone, message}: WhatsAppMessageProps) {

    return `
        🚗 Solicitud de información

        Estoy interesado en el siguiente vehículo:

        Marca:
        ${car.marca}

        Modelo:
        ${car.modelo}

        Año:
        ${car.anio}

        Precio:
        ${formatCurrency(car.precio)}

        ----------------------------

        Datos del cliente:

        Nombre:
        ${name}

        Teléfono:
        ${phone}


        Consulta:
        ${message}

        Gracias.
`;

}

export function generateWhatsAppUrl( message: string ) {
    const phone = "526681013568"; 
    // Cambia este número por el WhatsApp de Autos Valdez

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
import z from "zod";

export const SearchSchema = z.object({
    search: z.string().trim().min(1, {message: 'La búsqueda no pude ir vacia'})
})

export const CarSchema = z.object({
    marca: z.string().trim().min(1, { message: 'La marca no puede ir vacia'}),
    modelo: z.string().trim().min(1, { message: 'El modelo no puede ir vacia'}),
    anio: z.string().trim().min(1, { message: 'El año no puede ir vacio'}),
    precio: z.string().trim().transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' }),
    info: z.string().trim().min(1, { message: 'La información del vehiculo no puede ir vacia'}),
    image: z.string().min(1, {message: 'La imagen es obligatoria'})
})

export const contactLeadSchema = z.object({
    name: z.string().min(3, "El nombre debe tener mínimo 3 caracteres"),
    phone: z.string().min(10, "El teléfono debe tener mínimo 10 números").regex(/^[0-9]+$/,"El teléfono solo debe contener números"),
    email: z.string().email("Correo electrónico no válido").or(z.literal("")).optional(),
    message: z.string().min(5, "La duda debe tener mínimo 5 caracteres")
})
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
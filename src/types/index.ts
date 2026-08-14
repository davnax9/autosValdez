import { Prisma } from "@/src/generated/prisma/client"

export type CarWithImages = Prisma.CarGetPayload<{
    include: {
        images: true
    }
}>
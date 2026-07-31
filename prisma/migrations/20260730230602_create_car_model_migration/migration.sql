-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "anio" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "info" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "fechaVenta" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

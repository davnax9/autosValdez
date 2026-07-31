import Link from "next/link";


export default function NotFound() {
  return (
    <div className="text-center">
        <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold my-4 mx-2 text-black text-center">Vehículo no encontrado</h1>
        <Link href={'/admin'} className="bg-red-600 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto">Ir al admin</Link>
    </div>
  )
}

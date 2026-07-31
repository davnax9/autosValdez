import { Car } from "@/src/generated/prisma/client"
import ImageUpload from "../ui/ImageUpload"

type CarFormPros = {
    car?: Car
}

export default async function CarForm({car}: CarFormPros) {

  return (
    <>

        <div className="space-y-2">
            <label className="text-slate-800" htmlFor="marca">Marca:</label>
            <input id="marca" name="marca" className="block w-full p-3 bg-slate-100" placeholder="Marca" defaultValue={car?.marca}/>
        </div>

        <div className="space-y-2">
            <label className="text-slate-800" htmlFor="modelo">Modelo:</label>
            <input id="modelo" name="modelo" className="block w-full p-3 bg-slate-100" placeholder="Modelo" defaultValue={car?.modelo}/>
        </div>
        
        <div className="space-y-2">
            <label className="text-slate-800" htmlFor="anio">Año:</label>
            <input id="anio" type="text" name="anio" className="block w-full p-3 bg-slate-100" placeholder="Nombre Producto" defaultValue={car?.anio} />
        </div>

        <div className="space-y-2">
            <label className="text-slate-800" htmlFor="precio">Precio:</label>
            <input id="precio" name="precio" className="block w-full p-3 bg-slate-100" placeholder="Precio" defaultValue={car?.precio}/>
        </div>

        <div className="space-y-2">
            <label className="text-slate-800" htmlFor="info">Información:</label>
            <input id="info" name="info" className="block w-full p-3 bg-slate-100" placeholder="Información" defaultValue={car?.info}/>
        </div>

        <ImageUpload image={car?.image}/>
    </>
  )
}

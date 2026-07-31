import Image from "next/image";
import RedesSociales from "./RedesSociales";


export default function Footer() {
  return (
    <div className="text-center">
        <p className="text-white text-sm pt-3">Los Mochis, Sinaloa.</p>
        <p className="text-white text-sm pt-5">Cualquier duda favor de contactarnos, estamos para servirle.</p>
        <p className="text-white text-sm pt-5">Redes Sociales:</p>
        <div className="flex justify-center items-center gap-3 mt-3">
            <RedesSociales />
        </div>
        <p className="text-white text-sm pt-5">{new Date().toLocaleDateString()}</p>
    </div>
  )
}

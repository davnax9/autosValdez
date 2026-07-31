import Image from "next/image";


export default function Logo() {
  return (
    <div className="flex justify-center mt-3 mx-10">
        <div className="relative w-40 h-40">
            <Image fill alt="Logotipo" src='/logoAV.png'/>
        </div>
    </div>
  )
}

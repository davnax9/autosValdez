import Image from "next/image";

export default function RedesSociales() {
  return (
    <>
        <a href="https://www.facebook.com"target="_blank">
            <Image src="/facebook.png" alt="Facebook" width={30} height={30}/>
        </a>

        <a href="https://wa.me/526681234567" target="_blank">
            <Image src="/whatsapp.png" alt="WhatsApp" width={30} height={30}/>
        </a>
    </>
  )
}

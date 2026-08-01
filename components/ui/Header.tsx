import Image from "next/image";
import Logo from "./Logo";
import Title from "./Title";
import RedesSociales from "./RedesSociales";


export default function Header() {
  return (
    <>  
      <header className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 w-full px-4 py-3">
        <div className="flex justify-center md:justify-start">
          <Logo />
        </div>

        <div className="flex justify-center">
          <Title>Autos Valdez</Title>
        </div>

        <div className="flex justify-center md:justify-end gap-3">
          <a href="https://www.facebook.com" target="_blank">
            <Image src="/facebook.png" alt="Facebook" width={30} height={30}/>
          </a>

          <a href="https://wa.me/526681234567" target="_blank">
            <Image src="/whatsapp.png" alt="WhatsApp" width={30} height={30}/>
          </a>
        </div>
      </header>
    </>
  )
}

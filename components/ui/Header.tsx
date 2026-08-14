"use client";

import Image from "next/image";
import Logo from "./Logo";
import Title from "./Title";
import Modal from "./Modal";
import { useState } from "react";
import PasswordForm from "./PassWordForm";

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>  
      <header className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 w-full px-4 py-3">
        <div className="flex justify-center md:justify-start">
          <Logo />
        </div>

        <div className="flex justify-center">
          <button type="button" onClick={() => setIsOpen(true)} className="cursor-pointer">
              <Title>GMJ Motors</Title>
          </button>
        </div>

        <div className="flex justify-center md:justify-end gap-3">
          <a href="https://www.facebook.com/luismartin.valdezhernandez" target="_blank">
            <Image src="/facebook.png" alt="Facebook" width={30} height={30}/>
          </a>

          <a href="https://wa.me/526681013568" target="_blank">
            <Image src="/whatsapp.png" alt="WhatsApp" width={30} height={30}/>
          </a>
        </div>
      </header>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Acceso Informativo">
          <PasswordForm onClose={() => setIsOpen(false)}/>
      </Modal>
    </>
  )
}

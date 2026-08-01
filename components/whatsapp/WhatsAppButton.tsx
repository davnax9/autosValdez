"use client";

import { useState } from "react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/ui/Modal";
import { Car } from "@/src/generated/prisma/client";
import WhatsAppForm from "./WhatsAppForm";

type WhatsAppButtonProps = {
    car: Car;
}

export default function WhatsAppButton({car}: WhatsAppButtonProps) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* <button type="button" onClick={() => setIsOpen(true)} className=" flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white */}
            <button type="button" onClick={() => setIsOpen(true)} className="bg-red-600 hover:bg-red-700 mt-5 w-full p-3 font-bold text-white text-lg rounded-lg">
                {/* <ChatBubbleBottomCenterTextIcon className="w-5 h-5" /> */}
                Solicitar información
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Solicitar información">
                <WhatsAppForm car={car} onClose={() => setIsOpen(false)}/>
            </Modal>
        </>
    )
}
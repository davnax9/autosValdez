"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
};

export default function Modal({isOpen, onClose, title, children}: ModalProps) {

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">

            {/* Fondo oscuro */}
            <div className="fixed inset-0 bg-black/50"aria-hidden="true"/>

            {/* Contenedor */}
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="w-full max-w-lg rounded-lg bg-white shadow-xl transform transition-all">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b p-5">
                        <DialogTitle className="text-xl font-bold text-gray-800">
                            {title}
                        </DialogTitle>

                        <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
                            <XMarkIcon className="w-6 h-6 text-gray-600"/>
                        </button>
                    </div>

                    {/* Contenido */}
                    <div className="p-5">{children}</div>

                </DialogPanel>
            </div>
        </Dialog>
    );
}
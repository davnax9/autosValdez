"use client";

import { Dialog, DialogPanel, DialogTitle} from "@headlessui/react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDialog({ isOpen, title, message, confirmText = "Aceptar", cancelText = "Cancelar", onConfirm, onClose }: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Fondo oscuro */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Contenedor */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <DialogTitle className="text-xl font-semibold text-gray-900">{title}</DialogTitle>

          <p className="mt-3 text-gray-600">{message}</p>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100 transition">{cancelText}</button>

            <button onClick={() => {
                onConfirm()
                onClose()
              }}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
            >
              {confirmText}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
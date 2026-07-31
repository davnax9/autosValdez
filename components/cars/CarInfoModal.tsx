"use client"

import { Dialog,DialogPanel,DialogTitle} from "@headlessui/react"

type CarInfoModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: (paymentMethod: string) => void
  carInfo: string
}

export default function CarInfoModal({open, onClose, onConfirm, carInfo}: CarInfoModalProps) {

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">

      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Contenedor */}
      <div className="fixed inset-0 flex items-center justify-center p-4">

        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

          <DialogTitle className="text-xl font-bold">Información del vehiculo</DialogTitle>

          <div className="mt-6 flex justify-end gap-3">

            <p className="text-lg">{carInfo}</p>

          </div>

        </DialogPanel>

      </div>

    </Dialog>
  )
}

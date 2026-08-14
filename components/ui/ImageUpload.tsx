"use client"

import { getImagePath } from '@/src/utils'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

type ImageUploadProps = {
    images?: string[]
}

export default function ImageUpload({ images = [] }: ImageUploadProps) {

    const [imageUrls, setImageUrls] = useState<string[]>([])

    const allImages = [...images, ...imageUrls]

    return (
        <CldUploadWidget uploadPreset="quiosco" options={{ maxFiles: 10, multiple: true }}
            onSuccess={(result, { widget }) => {
                if (result.event === 'success') {
                    // @ts-ignore
                    const url = result.info?.secure_url
                    if (url) {
                        setImageUrls(prev => [...prev, url])
                    }
                }
            }}
        >
            {({ open }) => (
                <>
                    <div className="space-y-2">
                        <label className="text-slate-800">Imágenes del vehículo</label>
                        <div onClick={() => open()} className="cursor-pointer hover:opacity-70 transition p-10 border border-neutral-300 flex flex-col justify-center items-center gap-4
                            text-neutral-600 bg-slate-100"
                        >
                            <TbPhotoPlus size={50} />
                            <p className="text-lg font-semibold">Agregar imágenes</p>
                        </div>
                    </div>

                    {allImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            {allImages.map((image, index) => (
                                <div key={`${image}-${index}`} className="relative aspect-square">
                                    <Image fill src={image.startsWith('http') ? image : getImagePath(image)} alt={`Imagen ${index + 1}`} className="object-cover rounded-lg"/>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Enviar las imágenes al formulario */}
                    {allImages.map((image, index) => (
                        <input key={index} type="hidden" name="images" value={image} readOnly/>
                    ))}
                </>
            )}
        </CldUploadWidget>
    )
}
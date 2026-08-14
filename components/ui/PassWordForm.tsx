"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type PasswordFormProps = {
    onClose: () => void;
};

export default function PasswordForm({ onClose }: PasswordFormProps) {

    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password === "MarlethAlejandra") {
            onClose();
            router.push("/admin");
        } else {
            toast.error("Contraseña incorrecta");
            setPassword("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa la contraseña"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    autoFocus
                />
            </div>

            <div className="flex justify-end gap-3">
                <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100">Cancelar</button>
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Ingresar</button>
            </div>
        </form>
    );
}
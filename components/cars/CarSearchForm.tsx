"use client"

import { SearchSchema } from "@/src/schemas"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CarSearchForm() {

  const router = useRouter()

  const handleSearchForm = (formData: FormData) => {
    const data = {
        search: formData.get('search')
    }
    const result = SearchSchema.safeParse(data)
    
    if(!result.success){
        result.error.issues.forEach(issue => {
            toast.error(issue.message)
        })
        return
    }

    router.push(`/admin/search?search=${result.data.search}`)
  }

  return (
    <form action={handleSearchForm} className="flex items-center">
        <Link href="/admin"className="border border-red-600 border-r-0 p-2 h-[42px] flex items-center justify-center bg-red-600 border-red-600 hover:bg-red-700 text-white transition-colors">
          <ArrowPathIcon className="w-5 h-5" />
        </Link>
        <input type="text" placeholder="Buscar Producto" className="p-2 border border-red-600  border- placeholder-gray-400 w-full" name="search" />
        <input type="submit" value={'Buscar'} className="bg-red-600 hover:bg-red-700 p-2 uppercase text-white cursor-pointer"/>
    </form>
  )
}

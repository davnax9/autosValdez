import { HomeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function GoStore() {
  return (
    <div className="flex justify-end my-2">
        <Link href={"/"}><HomeIcon className="w-8 h-8 text-red-600 hover:text-red-700" /></Link>
    </div>
  )
}

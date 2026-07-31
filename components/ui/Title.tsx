import React from 'react'

export default function Title({children}: {children: React.ReactNode }) {
  return (
    <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold my-4 mx-2 text-gray-200 text-center">{children}</h1>
  )
}

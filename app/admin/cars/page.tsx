import AddCarForm from "@/components/cars/AddCarForm";
import CarForm from "@/components/cars/CarForm";

export default function page() {
  return (
    <>
      <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold my-4 mx-2 text-black text-center">Nuevo Vehículo</h1>

      <AddCarForm>
        <CarForm />
      </AddCarForm>
    </>
  )
}

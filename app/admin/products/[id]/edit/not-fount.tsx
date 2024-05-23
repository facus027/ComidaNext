import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFount() {
  return (
    <div className="text-center">
      <Heading>Producto NO Encontrado</Heading>
      <Link
        href="/admin/products"
        className="bg-amber-400 text-black w-full lg:w-auto text-xl px-10 py-3 text-center cursor-pointer font-bold rounded-md"
      >
        Ir a Productos
      </Link>
    </div>
  );
}

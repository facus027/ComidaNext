"use client";
import { useStore } from "@/src/store";
import { Product } from "@prisma/client";

type AddProductButtonProps = {
  product: Product;
};

export default function AddProductButton({ product }: AddProductButtonProps) {
  const { addToCard } = useStore();
  return (
    <button
      type="button"
      className=" bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase cursor-pointer font-bold"
      onClick={() => addToCard(product)}
    >
      Agregar
    </button>
  );
}

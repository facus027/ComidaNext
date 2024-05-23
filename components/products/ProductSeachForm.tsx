"use client";

import { SearchScheema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProductSeachForm() {
  const router = useRouter();
  const handlerSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };
    const result = SearchScheema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }
    router.push(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form action={handlerSearchForm} className=" flex items-center gap-5">
      <input
        type="text"
        placeholder="Buscar Producto"
        className=" p-2 placeholder-gray-400 w-full"
        name="search"
      />
      <input
        type="submit"
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer rounded-lg"
        value={`Buscar`}
      />
    </form>
  );
}

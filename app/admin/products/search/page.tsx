import ProductTable from "@/components/admin/ProductTable";
import ProductSeachForm from "@/components/products/ProductSeachForm";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProductByname(searchParams: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchParams,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
  return products;
}

export default async function ProductSearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const productsResult = await searchProductByname(searchParams.search);
  return (
    <>
      <Heading>Resultados de Busqueda: {searchParams.search}</Heading>
      <div className=" flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductSeachForm />
      </div>

      {productsResult.length ? (
        <ProductTable products={productsResult} />
      ) : (
        <p className="text-lg text-center">No hay resultados.</p>
      )}
    </>
  );
}

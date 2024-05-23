import ProductTable from "@/components/admin/ProductTable";
import ProductsPagination from "@/components/admin/ProductsPagination";
import ProductSeachForm from "@/components/products/ProductSeachForm";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getProductsCount() {
  return prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const product = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  });
  return product;
}

//  >> Forma de saber el type que retorna una funcion. <<
export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;

  if (page < 0) {
    redirect("/admin/products");
  }

  const productsData = getProducts(page, pageSize);
  const productCountData = getProductsCount();
  const [products, totalProduct] = await Promise.all([
    productsData,
    productCountData,
  ]);
  const totalPage = Math.ceil(totalProduct / pageSize);

  if (page > totalPage) {
    redirect("/admin/products");
  }

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className=" flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href="/admin/products/new"
          className="bg-amber-400 w-full lg:w-auto text-xl px-8 py-2 font-bold rounded-md"
        >
          Crear Producto
        </Link>

        <ProductSeachForm />
      </div>

      <ProductTable products={products} />

      <ProductsPagination page={page} totalPage={totalPage} />
    </>
  );
}

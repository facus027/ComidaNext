import ProductsCard from "@/components/products/ProductsCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
  return products;
}

export default async function OrderPage({
  params,
}: {
  params: { category: string };
}) {
  const products = await getProducts(params.category);
  return (
    <>
      <Heading>Elige y personaliza tu perdido a continuación</Heading>

      <div className=" grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-5 items-center gap-5">
        {products.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

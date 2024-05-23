import { prisma } from "@/src/lib/prisma";
import CategoriesIcons from "../ui/CategoriesIcons";
import Logo from "../ui/Logo";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  const categories = await getCategories();

  return (
    <>
      <aside className=" md:w-72 lg:h-screen bg-white pt-4">
        <Logo />
        <nav>
          {categories.map((category) => (
            <CategoriesIcons key={category.id} category={category} />
          ))}
        </nav>
      </aside>
      ;
    </>
  );
}

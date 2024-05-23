import AddProductForm from "@/components/products/AddProductForm";
import Heading from "@/components/ui/Heading";
import ProductForm from "@/components/products/ProductForm";

export default function NewProductPage() {
  return (
    <>
      <Heading>Agregar Nuevo Producto</Heading>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}

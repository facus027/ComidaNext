"use client";
import { useStore } from "@/src/store";
import React, { useMemo } from "react";
import ProductDetail from "./ProductDetail";
import { formatCurrency } from "@/src/util";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function OrderSumary() {
  const { order, clearOrder } = useStore();
  const total = useMemo(
    () => order.reduce((total, item) => total + item.price * item.quantity, 0),
    [order]
  );

  const handlerCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order,
    };
    const result = OrderSchema.safeParse(data);
    console.log(result);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
    }

    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
    }

    toast.success(`Orden Realizada.. Gracias ${formData.get("name")}`);
    clearOrder();
  };

  return (
    <aside className=" lg:overflow-y-scroll md:w-64 lg:w-80 p-5">
      <h1 className=" text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className=" text-center my-10">El carrito esta vacio</p>
      ) : (
        <div className=" mt-5">
          {order.map((item) => (
            <ProductDetail key={item.id} item={item} />
          ))}

          <p className="text-2xl mt-20 text-center">
            Total a pagar:{""}
            <span className=" font-bold">{formatCurrency(total)}</span>
          </p>
          <form action={handlerCreateOrder}>
            <input
              type="text"
              placeholder="Tu Nombre"
              className=" p-2 rounded-md bg-white border-gray-100 hover:border-gray-500 w-full mt-1"
              name="name"
            />

            <input
              type="submit"
              className=" py-1 rounded uppercase text-center bg-indigo-800 hover:bg-indigo-700 text-white w-full mt-3 cursor-pointer"
              value="Confirmar Orden"
            />
          </form>
        </div>
      )}
    </aside>
  );
}

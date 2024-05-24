"use client";
import Heading from "@/components/ui/Heading";
import React from "react";
import OrderCard from "@/components/admin/OrderCard";
import useSWR from "swr";
import { OrderWhithProducts } from "@/src/types";

export default function OrdersPage() {
  const url = "/admin/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderWhithProducts[]>(
    url,
    fetcher,
    {
      refreshInterval: 10000,
      revalidateOnFocus: false,
    }
  );

  if (isLoading)
    return <p className=" text-2xl text-center mt-10 font-bold">Cargando...</p>;

  if (data)
    return (
      <>
        <Heading>Administrar Ordenes</Heading>

        {data.length ? (
          <div className=" grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-2">
            {data.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl">No hay ordenes Pendientes.</p>
        )}
      </>
    );
}

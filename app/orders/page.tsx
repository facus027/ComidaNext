"use client";
import LatestOrderItem from "@/components/order/LatestOrderItem";
import Logo from "@/components/ui/Logo";
import { OrderWhithProducts } from "@/src/types";
import React from "react";
import useSWR from "swr";

export default function OrdersReadypage() {
  const url = "/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderWhithProducts[]>(
    url,
    fetcher,
    {
      refreshInterval: 60000,
      revalidateOnFocus: false,
    }
  );

  if (isLoading)
    return <p className=" text-2xl text-center mt-10 font-bold">Cargando...</p>;

  if (data)
    return (
      <>
        <h1 className="text-6xl mt-20 font-black text-center">
          Ordenes Listas
        </h1>

        <Logo />

        {data.length ? (
          <>
            <div className=" grid grid-cols-1 gap-5 max-w-5xl mx-auto mt-10">
              {data.map((order) => (
                <LatestOrderItem key={order.id} order={order} />
              ))}
            </div>
          </>
        ) : (
          <p className=" text-4xl font-semibold text-center my-10">
            No Hay Ordenes Listas
          </p>
        )}
      </>
    );
}

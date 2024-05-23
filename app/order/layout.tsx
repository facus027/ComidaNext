import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSumary from "@/components/order/OrderSumary";
import ToastifyNotification from "@/components/ui/ToastifyNotification";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className=" md:flex">
        <OrderSidebar />

        <main className=" md:flex-1 md:h-screen md:overflow-y-scroll p-5">
          {children}
        </main>

        <OrderSumary />
      </div>

      <ToastifyNotification />
    </>
  );
}

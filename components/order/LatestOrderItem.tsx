import { OrderWhithProducts } from "@/src/types";
import React from "react";

export default function LatestOrderItem({
  order,
}: {
  order: OrderWhithProducts;
}) {
  return (
    <>
      <div className="bg-white shadow p-5 space-y-5 rounded-lg">
        <p className="text-2xl font-bold text-slate-600">
          Cliente:{" "}
          <span className=" text-amber-500 font-black">{order.name}</span>
        </p>
        <ul
          className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
          role="list"
        >
          {order.orderProducts.map((product) => (
            <li key={product.id} className=" flex py-6 text-lg">
              <p>
                <span className="font-bold">
                  ({product.quantity}) {""}
                </span>
                {product.product.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

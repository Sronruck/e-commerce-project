"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Ban, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderStatusTimeline from "@/components/OrderStatusTimeline";
import { mockOrder } from "@/data/mock";

const HOODIE_IMAGES: Record<string, string> = {
  gray: "https://d2cva83hdk3bwc.cloudfront.net/fear-of-god-essentials-fleece-hoodie-light-heather-gray-2.jpg",
  sand: "https://img.sasom.co.th/fear-of-god-essentials-fleece-hoodie-desert-sand-1-n.jpg?width=1920&quality=75",
  black: "https://d2cva83hdk3bwc.cloudfront.net/192as252050f-fear-of-god-essentials-classic-fit-fleece-hoodie-jet-black-1.jpg",
};

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(mockOrder);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const orderId = params.id;
    let foundOrder: any = null;

    // 1. ตรวจสอบข้อมูลเฉพาะของ Order ID นี้จาก localStorage ก่อน
    const specificDetail = localStorage.getItem(`orderDetail_${orderId}`);
    if (specificDetail) {
      try {
        foundOrder = JSON.parse(specificDetail);
      } catch (e) {
        console.error(e);
      }
    }

    // 2. ถ้าไม่พบ ให้ค้นหาจากรายการ orders รวม
    if (!foundOrder) {
      const allOrdersRaw = localStorage.getItem("orders");
      if (allOrdersRaw) {
        try {
          const allOrders = JSON.parse(allOrdersRaw);
          foundOrder = allOrders.find(
            (o: any) => o.id === orderId || o.orderNumber === orderId
          );
        } catch (e) {
          console.error(e);
        }
      }
    }

    // 3. จัดการสถานะและที่อยู่
    const savedStatus =
      localStorage.getItem(`orderStatus_${orderId}`) ||
      (foundOrder?.orderNumber ? localStorage.getItem(`orderStatus_${foundOrder.orderNumber}`) : null);
    const savedShipping = localStorage.getItem("shippingAddress");
    const defaultShipping = savedShipping ? JSON.parse(savedShipping) : mockOrder.shippingAddress;

    if (foundOrder) {
      const items = foundOrder.items || [];
      const subtotal = items.reduce((sum: number, it: any) => {
        const price = Number(it.product?.price ?? it.price ?? 0);
        const qty = Number(it.quantity ?? 1);
        return sum + price * qty;
      }, 0);
      const shipping = items.length > 0 ? 5 : 0;
      const total = foundOrder.total || subtotal + shipping;

      setOrder({
        id: foundOrder.id,
        orderNumber: foundOrder.orderNumber || orderId,
        createdAt: foundOrder.createdAt || new Date().toISOString(),
        status: savedStatus || foundOrder.status || "PENDING",
        statusHistory: foundOrder.statusHistory || [
          { status: "PENDING", timestamp: foundOrder.createdAt || new Date().toISOString() },
        ],
        items: items,
        shippingAddress: foundOrder.shippingAddress || defaultShipping,
        subtotal: subtotal,
        shipping: shipping,
        total: total,
      });
    } else if (orderId === "o1" || orderId === mockOrder.id || orderId === mockOrder.orderNumber) {
      setOrder({
        ...mockOrder,
        orderNumber: mockOrder.orderNumber,
        status: savedStatus || mockOrder.status,
      });
    } else {
      setOrder({
        ...mockOrder,
        orderNumber: orderId,
        status: savedStatus || "PENDING",
      });
    }

    setIsLoaded(true);
  }, [params.id]);

  const handleCancelOrder = () => {
    const isConfirm = window.confirm("คุณต้องการยกเลิกคำสั่งซื้อนี้ใช่หรือไม่?");
    if (isConfirm) {
      setOrder((prev: any) => ({ ...prev, status: "CANCELLED" }));
      
      // บันทึกสถานะระบุ Order ID และ Order Number ชัดเจน
      localStorage.setItem(`orderStatus_${params.id}`, "CANCELLED");
      if (order?.orderNumber) {
        localStorage.setItem(`orderStatus_${order.orderNumber}`, "CANCELLED");
      }

      // อัปเดตสถานะใน Array กลาง เพื่อให้หน้า Admin และ Orders List อัปเดตทันที
      try {
        const allOrdersRaw = localStorage.getItem("orders");
        if (allOrdersRaw) {
          const allOrders = JSON.parse(allOrdersRaw);
          const updated = allOrders.map((o: any) => {
            if (
              o.id === params.id || 
              o.orderNumber === params.id || 
              (order?.orderNumber && o.orderNumber === order.orderNumber)
            ) {
              return { ...o, status: "CANCELLED" };
            }
            return o;
          });
          localStorage.setItem("orders", JSON.stringify(updated));
        }
      } catch (e) {
        console.error("Failed to sync cancel status:", e);
      }
    }
  };

  const getImage = (item: any) => {
    const imgs = item.product?.images || item.images;
    if (imgs && imgs.length > 0) {
      return typeof imgs[0] === "string" ? imgs[0] : imgs[0]?.url;
    }
    if (item.image) {
      return item.image;
    }

    const color = (item.variant?.color || "").toLowerCase();
    const name = (item.product?.name || item.name || "").toLowerCase();
    if (color.includes("sand") || name.includes("sand")) return HOODIE_IMAGES.sand;
    if (color.includes("black") || name.includes("black")) return HOODIE_IMAGES.black;
    return HOODIE_IMAGES.gray;
  };

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
      </main>
    );
  }

  const isCancelled = order.status === "CANCELLED";

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/orders" className="text-xs text-gray-500 hover:text-black inline-flex items-center gap-1">
                <ArrowLeft size={14} /> Back to My Orders
              </Link>
            </div>
            <h1 className="text-lg font-semibold">Order #{order.orderNumber}</h1>
            <p className="text-sm text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                isCancelled
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-teal-50 text-teal-700 border border-teal-200"
              }`}
            >
              {order.status.replace(/_/g, " ")}
            </span>

            {!isCancelled && (
              <button
                onClick={handleCancelOrder}
                className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <Ban size={13} />
                <span>ยกเลิกออเดอร์</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2 rounded-xl border border-gray-100 p-6">
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-500">Tracking status</h2>
            {isCancelled ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle size={40} className="text-red-500 mb-3" />
                <h3 className="text-base font-semibold text-gray-900">คำสั่งซื้อนี้ถูกยกเลิกแล้ว</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm">
                  คำสั่งซื้อถูกระงับการจัดส่งเรียบร้อยแล้ว หากมีการตัดยอดเงิน ระบบจะทำการคืนเงินภายใน 3-5 วันทำการ
                </p>
                <Link
                  href="/shop"
                  className="mt-6 inline-flex rounded-lg bg-black px-5 py-2 text-xs font-medium text-white hover:bg-neutral-800"
                >
                  เลือกซื้อสินค้าอื่นต่อ
                </Link>
              </div>
            ) : (
              <OrderStatusTimeline history={order.statusHistory || []} currentStatus={order.status} />
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-100 p-6">
              <h2 className="mb-3 text-sm font-semibold uppercase text-gray-500">
                Items ({order.items.length})
              </h2>
              {order.items.map((it: any, index: number) => {
                const itemPrice = Number(it.product?.price ?? it.price ?? 0);
                const itemQty = Number(it.quantity ?? 1);
                const productName = it.product?.name ?? it.name ?? "Product Item";
                const color = it.variant?.color ?? "Standard";
                const size = it.variant?.size ?? "M";

                return (
                  <div key={it.id || it.variant?.id || index} className="flex gap-3 py-2 items-center">
                    <div className="h-14 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 border border-gray-200/50">
                      <img
                        src={getImage(it)}
                        alt={productName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium line-clamp-1">{productName}</p>
                      <p className="text-xs text-gray-500">
                        {color} / {size} × {itemQty}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      ${(itemPrice * itemQty).toFixed(2)}
                    </p>
                  </div>
                );
              })}
              <div className="mt-3 space-y-1 border-t border-gray-200 pt-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${Number(order.subtotal || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${Number(order.shipping || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-gray-100 pt-2 text-gray-900">
                  <span>Total</span>
                  <span>${Number(order.total || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 p-6 text-sm">
              <h2 className="mb-3 text-xs font-semibold uppercase text-gray-500">Shipping address</h2>
              <p className="font-medium text-gray-900">
                {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
              </p>
              <p className="text-gray-600">{order.shippingAddress?.address}</p>
              <p className="text-gray-600">
                {order.shippingAddress?.city} {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
              </p>
              <p className="text-gray-600">{order.shippingAddress?.country}</p>
              <p className="mt-2 text-gray-600">{order.shippingAddress?.phone}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
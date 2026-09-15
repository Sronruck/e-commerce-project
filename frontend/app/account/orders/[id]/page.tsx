import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderStatusTimeline from "@/components/OrderStatusTimeline";
import { mockOrder } from "@/data/mock";

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  // TODO: fetch(`/orders/${params.id}`) from backend instead of mock data
  const order = mockOrder;

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Order {order.orderNumber}</h1>
            <p className="text-sm text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span className="rounded-full bg-brand-mint px-4 py-1.5 text-xs font-semibold text-brand-teal">
            {order.status.replace(/_/g, " ")}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2 rounded-xl border border-gray-100 p-6">
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-500">Tracking status</h2>
            <OrderStatusTimeline history={order.statusHistory} currentStatus={order.status} />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-100 p-6">
              <h2 className="mb-3 text-sm font-semibold uppercase text-gray-500">Items</h2>
              {order.items.map((it) => (
                <div key={it.id} className="flex gap-3 py-2">
                  <div className="h-14 w-12 flex-shrink-0 rounded-lg bg-gray-100" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium line-clamp-1">{it.product.name}</p>
                    <p className="text-xs text-gray-500">
                      {it.variant.color} / {it.variant.size} × {it.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">${(it.price * it.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="mt-3 space-y-1 border-t border-gray-200 pt-3 text-sm">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span>${order.shipping.toFixed(2)}</span></div>
                <div className="flex justify-between font-semibold"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 p-6 text-sm">
              <h2 className="mb-3 text-xs font-semibold uppercase text-gray-500">Shipping address</h2>
              <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p className="text-gray-600">{order.shippingAddress.address}</p>
              <p className="text-gray-600">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
              <p className="text-gray-600">{order.shippingAddress.country}</p>
              <p className="mt-2 text-gray-600">{order.shippingAddress.phone}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

import { CheckCircle2, Circle } from "lucide-react";
import { OrderStatus, OrderStatusEvent } from "@/lib/types";

const STEPS: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const LABELS: Record<OrderStatus, string> = {
  PENDING: "Order placed",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function OrderStatusTimeline({
  history,
  currentStatus,
}: {
  history: OrderStatusEvent[];
  currentStatus: OrderStatus;
}) {
  const currentIndex = STEPS.indexOf(currentStatus);

  if (currentStatus === "CANCELLED") {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600">
        This order has been cancelled.
      </div>
    );
  }

  return (
    <ol className="relative ml-3 border-l-2 border-gray-200">
      {STEPS.map((step, i) => {
        const done = i <= currentIndex;
        const event = history.find((h) => h.status === step);
        return (
          <li key={step} className="mb-8 ml-6 last:mb-0">
            <span
              className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ${
                done ? "bg-brand-teal text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              {done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            </span>
            <p className={`text-sm font-semibold ${done ? "text-gray-900" : "text-gray-400"}`}>
              {LABELS[step]}
            </p>
            {event && (
              <time className="text-xs text-gray-500">
                {new Date(event.timestamp).toLocaleString()}
              </time>
            )}
            {event?.note && <p className="text-xs text-gray-500">{event.note}</p>}
          </li>
        );
      })}
    </ol>
  );
}

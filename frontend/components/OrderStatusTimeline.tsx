import { 
  Check, 
  Clock, 
  PackageCheck, 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { OrderStatus, OrderStatusEvent } from "@/lib/types";

const STEPS: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const LABELS: Record<OrderStatus, { title: string; desc: string }> = {
  PENDING: {
    title: "Order Placed",
    desc: "คำสั่งซื้อถูกสร้างเรียบร้อยแล้ว",
  },
  CONFIRMED: {
    title: "Confirmed",
    desc: "ยืนยันคำสั่งซื้อและการชำระเงิน",
  },
  PROCESSING: {
    title: "Processing",
    desc: "กำลังเตรียมและบรรจุหีบห่อสินค้า",
  },
  SHIPPED: {
    title: "Shipped",
    desc: "สินค้าถูกส่งมอบให้บริษัทขนส่งแล้ว",
  },
  OUT_FOR_DELIVERY: {
    title: "Out for Delivery",
    desc: "พนักงานกำลังนำส่งพัสดุไปยังที่อยู่ของคุณ",
  },
  DELIVERED: {
    title: "Delivered",
    desc: "พัสดุจัดส่งถึงผู้รับเรียบร้อยแล้ว",
  },
  CANCELLED: {
    title: "Cancelled",
    desc: "คำสั่งซื้อนี้ถูกยกเลิกแล้ว",
  },
};

const STEP_ICONS: Record<OrderStatus, React.ElementType> = {
  PENDING: Clock,
  CONFIRMED: PackageCheck,
  PROCESSING: Package,
  SHIPPED: Truck,
  OUT_FOR_DELIVERY: MapPin,
  DELIVERED: CheckCircle2,
  CANCELLED: AlertCircle,
};

export default function OrderStatusTimeline({
  history = [],
  currentStatus,
}: {
  history: OrderStatusEvent[];
  currentStatus: OrderStatus;
}) {
  const currentIndex = STEPS.indexOf(currentStatus);

  if (currentStatus === "CANCELLED") {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/60 p-4 text-red-700">
        <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-500" />
        <div>
          <h4 className="text-sm font-semibold">คำสั่งซื้อถูกยกเลิก (Order Cancelled)</h4>
          <p className="mt-0.5 text-xs text-red-600/90">
            คำสั่งซื้อนี้ถูกยกเลิกและไม่สามารถดำเนินการจัดส่งต่อได้
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
      <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-gray-400">Order Tracking</span>
          <h3 className="text-base font-semibold text-gray-900">สถานะการจัดส่งพัสดุ</h3>
        </div>
        <span className="inline-flex items-center rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
          {LABELS[currentStatus]?.title || currentStatus}
        </span>
      </div>

      <ol className="relative ml-4 border-l border-gray-200">
        {STEPS.map((step, i) => {
          const isDone = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isFuture = i > currentIndex;
          const event = history.find((h) => h.status === step);
          const Icon = STEP_ICONS[step];

          return (
            <li key={step} className="mb-7 ml-7 last:mb-0">
              {/* Icon Marker */}
              <div
                className={`absolute -left-3.5 flex h-7 w-7 items-center justify-center rounded-full border transition-colors ${
                  isDone
                    ? "border-black bg-black text-white"
                    : isCurrent
                    ? "border-black bg-white text-black ring-4 ring-gray-100"
                    : "border-gray-200 bg-white text-gray-300"
                }`}
              >
                {isDone ? (
                  <Check size={14} strokeWidth={2.5} />
                ) : (
                  <Icon size={14} strokeWidth={isCurrent ? 2 : 1.5} />
                )}
              </div>

              {/* Step Info */}
              <div className="flex flex-col gap-0.5">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
                  <p
                    className={`text-sm font-semibold tracking-tight ${
                      isCurrent
                        ? "text-gray-900"
                        : isDone
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    {LABELS[step]?.title}
                  </p>

                  {event?.timestamp && (
                    <time className="text-[11px] font-medium text-gray-400">
                      {new Date(event.timestamp).toLocaleDateString("th-TH", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  )}
                </div>

                <p className={`text-xs ${isFuture ? "text-gray-300" : "text-gray-500"}`}>
                  {LABELS[step]?.desc}
                </p>

                {event?.note && (
                  <div className="mt-1.5 rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-600 border border-gray-100">
                    {event.note}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
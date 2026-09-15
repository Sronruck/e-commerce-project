# Fashion Store — Full-Stack E-Commerce (โปรเจคปี 4)

ระบบ e-commerce แบบ full stack มีทั้งหน้าบ้าน (storefront) และหลังบ้าน (admin dashboard)
พร้อมระบบ role (Admin / Customer) และระบบติดตามสถานะสินค้า (order tracking)

## Tech Stack
- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Recharts
- **Backend:** NestJS + Prisma ORM + JWT Auth
- **Database:** PostgreSQL

## โครงสร้างโปรเจค
```
ecommerce-project/
├── frontend/     # Next.js storefront + admin dashboard
└── backend/      # NestJS REST API
```

## วิธีติดตั้งและรัน

### 1. เตรียม PostgreSQL
ติดตั้ง PostgreSQL ในเครื่อง หรือใช้ Docker:
```bash
docker run --name ecommerce-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=ecommerce -p 5432:5432 -d postgres
```

### 2. Backend (NestJS)
```bash
cd backend
npm install
cp .env.example .env          # แก้ DATABASE_URL / JWT_SECRET ตามจริง
npx prisma migrate dev --name init
npm run seed                  # สร้างข้อมูลตัวอย่าง (admin user + 1 product)
npm run start:dev             # รันที่ http://localhost:4000/api
```
บัญชี admin เริ่มต้น (จาก seed): `admin@fashionstore.com` / `Admin123!`

### 3. Frontend (Next.js)
```bash
cd frontend
npm install
cp .env.example .env.local    # NEXT_PUBLIC_API_URL ชี้ไปที่ backend
npm run dev                   # รันที่ http://localhost:3000
```

## หน้าเว็บที่มีให้แล้ว

**หน้าบ้าน**
- `/` Home
- `/sign-in`, `/sign-up`
- `/shop`, `/shop/[slug]` (filter ตามหมวดหมู่/แท็ก)
- `/product/[id]` รายละเอียดสินค้า (เลือกสี/ไซส์)
- `/cart` ตะกร้าสินค้า
- `/checkout`, `/checkout/payment`
- `/account/orders/[id]` ติดตามสถานะสินค้า

**หลังบ้าน (Admin)** — ธีม dark glassmorphism
- `/admin` Dashboard (กราฟยอดขาย, Recent Orders, Customer Insights)
- `/admin/products`, `/admin/products/new`
- `/admin/orders`
- `/admin/categories`
- `/admin/users`
- `/admin/analytics`
- `/admin/settings`

## สิ่งที่ยังต้องทำต่อ (สำหรับพัฒนาต่อในโปรเจคจบ)
- [ ] เชื่อมหน้าบ้านทุกหน้ากับ backend จริง (ตอนนี้ frontend ใช้ mock data ใน `frontend/data/mock.ts`)
- [ ] ระบบ cart แบบ global state (แนะนำ zustand ที่ติดตั้งไว้ให้แล้ว) แทน state ในแต่ละหน้า
- [ ] Auth guard ฝั่ง frontend (redirect ถ้าไม่ได้ login / ไม่ใช่ admin) ที่ `app/admin/layout.tsx`
- [ ] อัปโหลดรูปสินค้าจริง (แนะนำ Cloudinary หรือเก็บใน S3/MinIO) — ตอนนี้ backend มีแค่ field เก็บ URL
- [ ] เชื่อม payment gateway จริง (Omise/Stripe) แทน endpoint `payments/confirm` ที่เป็น mock
- [ ] เพิ่ม pagination จริงในตาราง admin (ตอนนี้เป็น UI เปล่า)
- [ ] เขียน unit/e2e test

## Prisma Schema Highlights
ดูรายละเอียดเต็มที่ `backend/prisma/schema.prisma` — ออกแบบให้รองรับ:
- สินค้าแบบมี variant (สี/ไซส์/สต็อกแยกกัน)
- Order + `OrderStatusEvent` (เก็บ timeline การเปลี่ยนสถานะ ใช้ power หน้าติดตามสถานะสินค้า)
- Role-based access (`ADMIN` / `CUSTOMER`) ผ่าน `RolesGuard`

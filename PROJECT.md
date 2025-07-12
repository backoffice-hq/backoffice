# Back Office Project Overview

## 🏗️ Project Structure

This is a monorepo containing a comprehensive back office management system built with TypeScript, Next.js, and a modular architecture.

### 📂 Directory Structure

```
backoffice/
├── apps/
│   ├── backoffice/           # Main Next.js application
│   │   ├── app/              # Next.js App Router structure
│   │   │   ├── (auth)/       # Authentication routes
│   │   │   └── (main)/       # Main application routes
│   │   ├── components/       # React components
│   │   └── package.json      # Frontend dependencies
│   └── docs/                 # Documentation site
├── packages/
│   ├── auth/                 # Authentication package
│   ├── core/                 # Core framework (⭐ Main startup logic)
│   ├── database/             # Database connection & ORM
│   ├── modules/              # Business modules
│   ├── ui/                   # UI components library
│   └── eslint-config/        # ESLint configuration
├── backoffice.config.ts      # Main configuration file
└── package.json              # Root workspace configuration
```

## 🔧 Key Components

### 1. **Configuration System** (`backoffice.config.ts`)
- Central configuration file using `defineConfig` from `@backoffice/core`
- Defines company information, database settings, and modules
- Currently configured for PostgreSQL database

### 2. **Core Framework** (`packages/core/`)
- Contains the main `BackOfficeApp` class for application initialization
- Handles configuration loading, validation, and module management
- Provides logging utilities and error handling

### 3. **Database Layer** (`packages/database/`)
- Supports PostgreSQL and SQLite databases
- Uses Drizzle ORM for type-safe database operations
- Includes connection pooling and migration support

### 4. **Frontend Application** (`apps/backoffice/`)
- Next.js 15 application with App Router
- Includes authentication, settings, and main dashboard
- Uses Tailwind CSS and shadcn/ui for styling

## 🚀 Startup Process และการจัดการ Database

### ปัญหาที่พบ
จากโค้ดที่วิเคราะห์ พบว่า:
1. **ไม่มี startup process** ที่ชัดเจนใน Next.js app
2. **ไม่มีการเรียกใช้ BackOfficeApp** ใน frontend
3. **ไม่มีการ initialize database** เมื่อเริ่มต้นแอปพลิเคชัน

### 🔧 แนวทางแก้ไข

#### 1. **สร้าง Startup Process ใน Next.js**
สร้างไฟล์ `apps/backoffice/lib/startup.ts`:

```typescript
import { BackOfficeApp } from '@backoffice/core';
import { createDrizzleClient } from '@backoffice/database';
import config from '../../../backoffice.config';

let app: BackOfficeApp | null = null;

export async function initializeApp(): Promise<BackOfficeApp> {
  if (app) return app;

  try {
    // Initialize BackOfficeApp
    app = new BackOfficeApp(config);
    
    // Test database connection
    await createDrizzleClient(app.config.database);
    
    console.log('✅ Back Office initialized successfully');
    return app;
  } catch (error) {
    console.error('❌ Failed to initialize Back Office:', error);
    throw error;
  }
}
```

#### 2. **เพิ่มการเรียกใช้ใน Root Layout**
แก้ไขไฟล์ `apps/backoffice/app/layout.tsx`:

```typescript
import { initializeApp } from '@/lib/startup';

// Initialize app on server startup
if (typeof window === 'undefined') {
  initializeApp().catch(console.error);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ... existing code
}
```

#### 3. **สร้าง Database Health Check API**
สร้างไฟล์ `apps/backoffice/app/api/health/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { createDrizzleClient } from '@backoffice/database';
import config from '../../../../backoffice.config';

export async function GET() {
  try {
    const db = await createDrizzleClient(config.database);
    return NextResponse.json({ status: 'healthy', database: 'connected' });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}
```

#### 4. **ปรับปรุง package.json scripts**
เพิ่มใน `apps/backoffice/package.json`:

```json
{
  "scripts": {
    "dev": "next dev --port 3000 --turbopack",
    "dev:check": "node -e \"fetch('http://localhost:3000/api/health').then(r=>r.json()).then(console.log)\"",
    "db:check": "node -e \"require('./lib/startup').initializeApp()\""
  }
}
```

### 📍 สถานที่ที่ควรใช้ Startup Process

1. **หลัก**: `apps/backoffice/lib/startup.ts` - ไฟล์สำหรับ initialize แอปพลิเคชัน
2. **Entry Point**: `apps/backoffice/app/layout.tsx` - เรียกใช้ startup เมื่อเซิร์ฟเวอร์เริ่มต้น
3. **Health Check**: `apps/backoffice/app/api/health/route.ts` - ตรวจสอบสถานะฐานข้อมูล
4. **Package Core**: `packages/core/src/app.ts` - ควรเพิ่มเมธอด `start()` สำหรับ initialization

### 🎯 ผลลัพธ์ที่ได้

เมื่อใช้งาน `pnpm dev`:
- ✅ ระบบจะ initialize `BackOfficeApp` อัตโนมัติ
- ✅ ตรวจสอบการเชื่อมต่อฐานข้อมูลทันที
- ✅ แสดง error ชัดเจนหากฐานข้อมูลไม่สามารถเชื่อมต่อได้
- ✅ มี health check endpoint สำหรับตรวจสอบสถานะ

### 💡 Best Practices

1. **Error Handling**: ใช้ try-catch ทุกการเชื่อมต่อฐานข้อมูล
2. **Logging**: ใช้ Logger จาก `@backoffice/core` เพื่อติดตาม
3. **Environment Variables**: ตั้งค่า `DATABASE_URL` ใน `.env.local`
4. **Graceful Degradation**: แสดง error page หากฐานข้อมูลไม่พร้อมใช้งาน

## 🛠️ Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Check database connection
pnpm db:check

# Health check
curl http://localhost:3000/api/health

# Build for production
pnpm build
```

## 📦 Package Dependencies

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Database**: Drizzle ORM, PostgreSQL, SQLite
- **Build**: Turbo, TypeScript, ESLint
- **UI**: shadcn/ui, Lucide icons

## 🔐 Configuration

การกำหนดค่าทั้งหมดอยู่ใน `backoffice.config.ts`:
- ข้อมูลบริษัท
- การตั้งค่าฐานข้อมูล  
- โมดูลที่ใช้งาน
- สภาพแวดล้อม (development/production)

---

*สร้างโดย: Back Office Development Team* 
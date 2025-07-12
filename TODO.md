# TODO List - Back Office MVP

## 🎯 **MVP Tasks Overview**

เป้าหมาย MVP: **ผู้ใช้งานสามารถติดตั้งผ่าน localhost ได้ โดยมี database แบบ local และสามารถ login with root admin โดยตั้งค่าตอนเริ่มต้น, config company setting, แสดงข้อมูลผู้ใช้ได้**

### **Phase 1: Foundation (Database & Startup)**
- 🗄️ **Database Setup & Local Installation**
- 🚀 **Startup Process & Application Initialization**

### **Phase 2: Authentication & Security**
- 🔐 **Authentication & Root Admin Setup**

### **Phase 3: Business Logic**
- 🏢 **Company Settings & Configuration**
- 👥 **User Management System**

### **Phase 4: Frontend UI**
- 🎨 **Frontend UI & Pages**

### **Phase 5: Core Enhancements**
- ⚡ **Core Framework Enhancements**

### **Phase 6: Deployment & Quality**
- 📦 **Installation & Documentation**
- 🧪 **Basic Testing & Quality Assurance**

---

## 📋 **Detailed Task List**

### 🗄️ **Phase 1.1: Database Setup & Local Installation**

#### ✅ `mvp-database-setup` - Database Setup & Local Installation
- **Status**: Pending
- **Dependencies**: None
- **Description**: เตรียมพื้นฐานสำหรับ database system

#### ⬜ `database-schema` - สร้าง Database Schema สำหรับ users, companies, และ sessions
- **Status**: Pending  
- **Dependencies**: mvp-database-setup
- **Description**: ออกแบบและสร้าง database schema หลักทั้งหมด
- **Deliverable**: 
  - `packages/database/src/schemas/users.ts`
  - `packages/database/src/schemas/companies.ts`
  - `packages/database/src/schemas/sessions.ts`

#### ⬜ `database-migrations` - สร้าง Migration system สำหรับ automatic database setup
- **Status**: Pending
- **Dependencies**: database-schema
- **Description**: สร้างระบบ migration ที่จะ auto-setup database เมื่อเริ่มต้น
- **Deliverable**:
  - `packages/database/src/migrations/`
  - Migration runner system

#### ⬜ `local-database-config` - ตั้งค่า SQLite สำหรับ local development และ PostgreSQL สำหรับ production
- **Status**: Pending
- **Dependencies**: database-migrations
- **Description**: ตั้งค่า database configuration ให้รองรับทั้ง SQLite และ PostgreSQL
- **Deliverable**:
  - Updated `backoffice.config.ts`
  - Database connection logic

### 🚀 **Phase 1.2: Startup Process & Application Initialization**

#### ✅ `mvp-startup-process` - Startup Process & Application Initialization
- **Status**: Pending
- **Dependencies**: None
- **Description**: สร้างกระบวนการเริ่มต้นแอปพลิเคชัน

#### ⬜ `startup-lib` - สร้าง apps/backoffice/lib/startup.ts สำหรับ application initialization
- **Status**: Pending
- **Dependencies**: mvp-startup-process
- **Description**: สร้างไฟล์หลักสำหรับ initialize แอปพลิเคชัน
- **Deliverable**: `apps/backoffice/lib/startup.ts`

#### ⬜ `database-connection` - ปรับปรุง database connection ให้มี error handling และ retry logic
- **Status**: Pending
- **Dependencies**: startup-lib, local-database-config
- **Description**: เพิ่มความแข็งแกร่งให้กับการเชื่อมต่อฐานข้อมูล
- **Deliverable**: Enhanced database connection with error handling

#### ⬜ `health-check-api` - สร้าง /api/health endpoint สำหรับตรวจสอบ database connection
- **Status**: Pending
- **Dependencies**: database-connection
- **Description**: สร้าง API สำหรับตรวจสอบสถานะระบบ
- **Deliverable**: `apps/backoffice/app/api/health/route.ts`

---

### 🔐 **Phase 2: Authentication & Root Admin Setup**

#### ✅ `mvp-authentication` - Authentication & Root Admin Setup
- **Status**: Pending
- **Dependencies**: None
- **Description**: สร้างระบบ authentication หลัก

#### ⬜ `auth-schemas` - สร้าง User และ Session schemas ใน packages/database
- **Status**: Pending
- **Dependencies**: mvp-authentication, database-schema
- **Description**: สร้าง schema สำหรับระบบ authentication
- **Deliverable**: User และ Session database schemas

#### ⬜ `password-hashing` - ใช้ bcrypt สำหรับ password hashing และ validation
- **Status**: Pending
- **Dependencies**: auth-schemas
- **Description**: เพิ่มความปลอดภัยด้วย password hashing
- **Deliverable**: Password hashing utilities

#### ⬜ `session-management` - สร้าง session management system (cookies/JWT)
- **Status**: Pending
- **Dependencies**: password-hashing
- **Description**: จัดการ user sessions
- **Deliverable**: Session management system

#### ⬜ `root-admin-setup` - สร้าง initial setup process สำหรับ root admin user
- **Status**: Pending
- **Dependencies**: session-management
- **Description**: ระบบสำหรับสร้าง admin user ครั้งแรก
- **Deliverable**: Root admin setup wizard

#### ⬜ `login-api` - สร้าง /api/auth/login และ /api/auth/logout endpoints
- **Status**: Pending
- **Dependencies**: root-admin-setup
- **Description**: API endpoints สำหรับ authentication
- **Deliverable**: 
  - `/api/auth/login`
  - `/api/auth/logout`

---

### 🏢 **Phase 3.1: Company Settings & Configuration**

#### ✅ `mvp-company-management` - Company Settings & Configuration
- **Status**: Pending
- **Dependencies**: None
- **Description**: จัดการข้อมูลบริษัท

#### ⬜ `company-schema` - สร้าง Company schema และ CRUD operations
- **Status**: Pending
- **Dependencies**: mvp-company-management, database-schema
- **Description**: Database schema และ operations สำหรับข้อมูลบริษัท
- **Deliverable**: Company database schema และ CRUD functions

#### ⬜ `company-api` - สร้าง /api/company endpoints สำหรับ CRUD operations
- **Status**: Pending
- **Dependencies**: company-schema
- **Description**: API endpoints สำหรับจัดการข้อมูลบริษัท
- **Deliverable**: Company REST API endpoints

#### ⬜ `company-validation` - เพิ่ม validation rules สำหรับ company data
- **Status**: Pending
- **Dependencies**: company-api
- **Description**: ตรวจสอบความถูกต้องของข้อมูลบริษัท
- **Deliverable**: Company data validation rules

### 👥 **Phase 3.2: User Management System**

#### ✅ `mvp-user-management` - User Management System
- **Status**: Pending
- **Dependencies**: None
- **Description**: จัดการข้อมูลผู้ใช้

#### ⬜ `user-crud-api` - สร้าง /api/users endpoints สำหรับ user management
- **Status**: Pending
- **Dependencies**: mvp-user-management, auth-schemas
- **Description**: API สำหรับจัดการผู้ใช้
- **Deliverable**: User CRUD API endpoints

#### ⬜ `user-permissions` - สร้าง basic permission system (admin, user roles)
- **Status**: Pending
- **Dependencies**: user-crud-api
- **Description**: ระบบสิทธิ์ผู้ใช้พื้นฐาน
- **Deliverable**: Permission system

#### ⬜ `user-profile-api` - สร้าง /api/me endpoint สำหรับ current user profile
- **Status**: Pending
- **Dependencies**: user-permissions
- **Description**: API สำหรับข้อมูลผู้ใช้ปัจจุบัน
- **Deliverable**: `/api/me` endpoint

---

### 🎨 **Phase 4: Frontend UI & Pages**

#### ✅ `mvp-frontend-ui` - Frontend UI & Pages
- **Status**: Pending
- **Dependencies**: None
- **Description**: สร้าง user interface หลัก

#### ⬜ `login-page` - ปรับปรุง login form ให้เชื่อมต่อกับ API และ handle errors
- **Status**: Pending
- **Dependencies**: mvp-frontend-ui, login-api
- **Description**: หน้า login ที่สมบูรณ์
- **Deliverable**: Enhanced login page

#### ⬜ `setup-wizard` - สร้าง initial setup wizard สำหรับ root admin และ company config
- **Status**: Pending
- **Dependencies**: login-page, root-admin-setup, company-validation
- **Description**: ตัวช่วยตั้งค่าเริ่มต้น
- **Deliverable**: Setup wizard UI

#### ⬜ `dashboard-page` - สร้าง main dashboard page หลัง login สำเร็จ
- **Status**: Pending
- **Dependencies**: setup-wizard
- **Description**: หน้าหลักของแอปพลิเคชัน
- **Deliverable**: Main dashboard

#### ⬜ `company-settings-page` - สร้าง /settings/company page สำหรับแก้ไข company information
- **Status**: Pending
- **Dependencies**: dashboard-page, company-api
- **Description**: หน้าตั้งค่าบริษัท
- **Deliverable**: Company settings page

#### ⬜ `users-list-page` - สร้าง /settings/users page สำหรับแสดงรายการผู้ใช้
- **Status**: Pending
- **Dependencies**: company-settings-page, user-profile-api
- **Description**: หน้ารายการผู้ใช้
- **Deliverable**: Users list page

---

### ⚡ **Phase 5: Core Framework Enhancements**

#### ✅ `mvp-core-enhancements` - Core Framework Enhancements
- **Status**: Pending
- **Dependencies**: None
- **Description**: ปรับปรุง core framework

#### ⬜ `enhanced-backoffice-app` - เพิ่ม start() method ใน BackOfficeApp class
- **Status**: Pending
- **Dependencies**: mvp-core-enhancements
- **Description**: ปรับปรุง BackOfficeApp ให้มี startup method
- **Deliverable**: Enhanced BackOfficeApp class

#### ⬜ `config-validation` - เพิ่ม config validation ใน defineConfig function
- **Status**: Pending
- **Dependencies**: enhanced-backoffice-app
- **Description**: ตรวจสอบความถูกต้องของ configuration
- **Deliverable**: Config validation system

#### ⬜ `error-handling` - ปรับปรุง error handling และ logging ทั่วทั้งระบบ
- **Status**: Pending
- **Dependencies**: config-validation
- **Description**: จัดการข้อผิดพลาดและ logging
- **Deliverable**: Enhanced error handling

---

### 📦 **Phase 6.1: Installation & Documentation**

#### ✅ `mvp-installation` - Installation & Documentation
- **Status**: Pending
- **Dependencies**: None
- **Description**: เตรียมระบบสำหรับการติดตั้ง

#### ⬜ `environment-setup` - สร้าง .env.example และ installation guide
- **Status**: Pending
- **Dependencies**: mvp-installation
- **Description**: คู่มือการติดตั้งและ environment setup
- **Deliverable**: 
  - `.env.example`
  - Installation documentation

#### ⬜ `database-seeding` - สร้าง seed data สำหรับ development และ testing
- **Status**: Pending
- **Dependencies**: environment-setup, database-migrations
- **Description**: ข้อมูลตัวอย่างสำหรับการพัฒนา
- **Deliverable**: Database seed system

#### ⬜ `npm-scripts` - ปรับปรุง package.json scripts สำหรับ dev, build, และ db operations
- **Status**: Pending
- **Dependencies**: database-seeding
- **Description**: npm scripts ที่ครอบคลุม
- **Deliverable**: Enhanced package.json scripts

### 🧪 **Phase 6.2: Basic Testing & Quality Assurance**

#### ✅ `mvp-testing` - Basic Testing & Quality Assurance
- **Status**: Pending
- **Dependencies**: None
- **Description**: ระบบทดสอบพื้นฐาน

#### ⬜ `integration-tests` - สร้าง basic integration tests สำหรับ auth และ API endpoints
- **Status**: Pending
- **Dependencies**: mvp-testing, user-profile-api, company-api
- **Description**: การทดสอบการทำงานร่วมกัน
- **Deliverable**: Integration test suite

#### ⬜ `startup-tests` - สร้าง tests สำหรับ startup process และ database connection
- **Status**: Pending
- **Dependencies**: integration-tests, health-check-api
- **Description**: การทดสอบการเริ่มต้นระบบ
- **Deliverable**: Startup test suite

---

## 🏁 **MVP Success Criteria**

เมื่อทำ tasks ทั้งหมดเสร็จ จะได้:

✅ **Local Installation**: `pnpm install && pnpm dev` แล้วทำงานได้ทันที  
✅ **Local Database**: SQLite database ที่ auto-setup เมื่อเริ่มต้น  
✅ **Root Admin Setup**: Initial setup wizard สำหรับสร้าง admin user  
✅ **Company Configuration**: หน้าตั้งค่าข้อมูลบริษัท  
✅ **User Management**: หน้าแสดงข้อมูลผู้ใช้และจัดการ  
✅ **Authentication**: ระบบ login/logout ที่สมบูรณ์  

## 🚦 **Getting Started**

1. **เริ่มต้นด้วย Phase 1**: Database Setup เพราะเป็น foundation
2. **ทำตาม dependency chain**: database-schema → database-migrations → local-database-config
3. **Test แต่ละขั้นตอน**: ใช้ `/api/health` เพื่อตรวจสอบ database connection
4. **Mark tasks as completed**: อัพเดท status เมื่อทำเสร็จแต่ละ task

## 📊 **Progress Tracking**

- **Total Tasks**: 24 tasks
- **Completed**: 0 tasks (0%)
- **In Progress**: 0 tasks
- **Pending**: 24 tasks

---

*อัพเดทไฟล์นี้เมื่อมีความคืบหน้าในการพัฒนา* 
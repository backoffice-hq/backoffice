# Back Office Core

```bash
packages/core/
├── src/
│   ├── index.ts                       # Entry point หลักของแพ็คเกจ
│   │
│   ├── app.ts                         # คลาสหลักของแอปพลิเคชัน BackOfficeApp
│   │
│   ├── config/                        # โมดูลจัดการ Configuration
│   │   ├── index.ts                   # Export ทุกอย่างเกี่ยวกับ config
│   │   ├── types.ts                   # Type definitions ของ config
│   │   ├── loader.ts                  # ฟังก์ชันโหลด backoffice.config.ts
│   │   └── defaults.ts                # ค่าเริ่มต้นสำหรับ config
│   │
│   ├── module/                        # ระบบจัดการโมดูล
│   │   ├── index.ts                   # Export ทุกอย่างเกี่ยวกับระบบโมดูล
│   │   ├── types.ts                   # Type definitions ของโมดูล
│   │   ├── context.ts                 # Context ที่ส่งให้โมดูล
│   │   ├── registry.ts                # ModuleRegistry สำหรับลงทะเบียนและดึงโมดูล
│   │   ├── loader.ts                  # ModuleLoader สำหรับโหลดโมดูล
│   │   ├── factory.ts                 # ฟังก์ชัน createModule
│   │   └── utils.ts                   # Utility functions สำหรับโมดูล
│   │
│   ├── plugin/                        # ระบบจัดการ Plugins
│   │   ├── index.ts                   # Export ทุกอย่างเกี่ยวกับ plugins
│   │   ├── types.ts                   # Type definitions ของ plugin
│   │   ├── registry.ts                # PluginRegistry สำหรับลงทะเบียน plugins
│   │   ├── loader.ts                  # PluginLoader สำหรับโหลด plugins
│   │   └── factory.ts                 # ฟังก์ชัน createPlugin
│   │
│   ├── server/                        # การจัดการเซิร์ฟเวอร์
│   │   ├── index.ts                   # Export ทุกอย่างเกี่ยวกับเซิร์ฟเวอร์
│   │   ├── types.ts                   # Type definitions ของเซิร์ฟเวอร์
│   │   ├── express.ts                 # Express server implementation
│   │   ├── middleware/                # Middleware ต่างๆ
│   │   │   ├── auth.ts                # Authentication middleware
│   │   │   ├── cors.ts                # CORS middleware
│   │   │   ├── error.ts               # Error handling middleware
│   │   │   └── logging.ts             # Logging middleware
│   │   └── routes/                    # เส้นทางหลักของเซิร์ฟเวอร์
│   │       ├── api.ts                 # API routes
│   │       ├── modules.ts             # Module routes
│   │       └── admin.ts               # Admin routes
│   │
│   ├── utils/                         # Utility functions
│   │   ├── index.ts                   # Export ทุกอย่างเกี่ยวกับ utils
│   │   ├── logger.ts                  # Logger ของระบบ
│   │   ├── errors.ts                  # Custom error classes
│   │   ├── security.ts                # Security utilities
│   │   └── validation.ts              # Validation utilities
│   │
│   └── events/                        # ระบบ Event Bus
│       ├── index.ts                   # Export ทุกอย่างเกี่ยวกับ events
│       ├── event-bus.ts               # Event Bus implementation
│       ├── types.ts                   # Type definitions ของ events
│       └── handlers.ts                # Default event handlers
│
├── package.json                      # ข้อมูลแพ็คเกจและ dependencies
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # เอกสารสำหรับแพ็คเกจ
```
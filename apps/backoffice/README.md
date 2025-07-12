# Back Office Application

Modern business management system built with Next.js 15 and TypeScript.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Configuration

Create `.env.local` file in the root directory:

```bash
# Database Configuration
DATABASE_TYPE=sqlite
NODE_ENV=development

# Application Settings
APP_NAME=Back Office
APP_URL=http://localhost:3000
APP_PORT=3000

# Authentication (will be added later)
JWT_SECRET=your-jwt-secret-key-here
SESSION_SECRET=your-session-secret-key-here

# For PostgreSQL (production)
# DATABASE_TYPE=postgres
# DATABASE_URL=postgresql://username:password@localhost:5432/backoffice
# NODE_ENV=production
```

### 3. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🔧 Features

- **Database Integration**: SQLite for development, PostgreSQL for production
- **Automatic Startup**: Database initialization and seeding on application start
- **Health Check**: `/api/health` endpoint for monitoring
- **Settings Management**: Company settings, user management, applications
- **Modern UI**: Built with Tailwind CSS and shadcn/ui

## 📊 Health Check

Check application status:

```bash
curl http://localhost:3000/api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-07-12T10:00:00.000Z",
  "uptime": 123.45,
  "application": {
    "name": "Back Office",
    "version": "0.0.1",
    "initialized": true,
    "startupTime": 1234,
    "ready": true
  },
  "database": {
    "connected": true,
    "initialized": true,
    "seeded": true,
    "ready": true
  },
  "errors": []
}
```

## 🗄️ Database

### Default Credentials
- **Email**: `root@backoffice.local`
- **Password**: `backoffice123`

### Database Location
- **SQLite**: `./data/backoffice.db`
- **PostgreSQL**: Set via `DATABASE_URL`

## 🏗️ Architecture

```
apps/backoffice/
├── app/
│   ├── (auth)/              # Authentication routes
│   ├── (main)/              # Main application routes
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/              # React components
├── lib/                     # Utilities and configurations
│   ├── startup.ts          # Application startup logic
│   └── server-init.ts      # Server initialization
└── README.md               # This file
```

## 🔗 API Routes

- `GET /api/health` - Health check endpoint

## 🛠️ Development

### Type Checking
```bash
pnpm typecheck
```

### Linting
```bash
pnpm lint
```

### Building
```bash
pnpm build
```

## 🚀 Production Deployment

1. Set environment variables:
```bash
DATABASE_TYPE=postgres
DATABASE_URL=postgresql://username:password@host:5432/backoffice
NODE_ENV=production
```

2. Build the application:
```bash
pnpm build
```

3. Start production server:
```bash
pnpm start
```

## 📝 Default Data

The application automatically creates:
- Root admin user (`root@backoffice.local`)
- Default company settings
- Database tables and initial data

## 🔍 Troubleshooting

### Database Connection Issues
- Check `DATABASE_TYPE` and `DATABASE_URL` in `.env.local`
- Verify database server is running (for PostgreSQL)
- Check `/api/health` endpoint for detailed status

### Startup Issues
- Check server logs for initialization errors
- Verify all dependencies are installed
- Ensure proper file permissions for SQLite database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request 
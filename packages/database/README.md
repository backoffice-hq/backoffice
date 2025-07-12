# @backoffice/database

Database package for Back Office system with support for SQLite (development) and PostgreSQL (production).

## Features

- 🗄️ **Multi-database support**: SQLite for development, PostgreSQL for production
- 🔄 **Automatic migrations**: Database schema creation and updates
- 🌱 **Seeding system**: Default data creation (root admin, default company)
- 🔧 **Configuration management**: Environment-based configuration
- 🔁 **Error handling**: Retry logic and proper error handling
- 📊 **Drizzle ORM**: Type-safe database operations

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Environment Variables

Create a `.env` file in your project root:

```bash
# For SQLite (development)
DATABASE_TYPE=sqlite
NODE_ENV=development

# For PostgreSQL (production)
# DATABASE_TYPE=postgres
# DATABASE_URL=postgresql://username:password@localhost:5432/backoffice
# NODE_ENV=production
```

### 3. Initialize Database

```typescript
import { setupDatabase } from '@backoffice/database';

// Initialize database with default configuration
const result = await setupDatabase();

// Or with custom configuration
const result = await setupDatabase({
  type: 'sqlite',
  database: './custom-database.db'
});
```

### 4. Use Database Client

```typescript
import { createDrizzleClient, users } from '@backoffice/database';

const client = await createDrizzleClient();

// Query users
const allUsers = await client.select().from(users);

// Insert new user
await client.insert(users).values({
  email: 'user@example.com',
  password: 'hashedPassword',
  firstName: 'John',
  lastName: 'Doe'
});
```

## Database Schema

### Users Table
- `id` - Primary key (UUID/Integer)
- `email` - User email (unique)
- `password` - Hashed password
- `firstName` - User first name
- `lastName` - User last name
- `role` - User role (root, admin, user)
- `isActive` - Account status
- `emailVerified` - Email verification status
- `lastLogin` - Last login timestamp
- `companyId` - Company association
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

### Companies Table
- `id` - Primary key (UUID/Integer)
- `name` - Company name
- `description` - Company description
- `email` - Company email
- `phone` - Company phone
- `address` - Company address
- `website` - Company website
- `logo` - Company logo URL
- `settings` - Company settings (JSON)
- `isActive` - Company status
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

### Sessions Table
- `id` - Primary key (UUID/Integer)
- `userId` - User ID (foreign key)
- `token` - Session token
- `expiresAt` - Expiration timestamp
- `userAgent` - User agent
- `ipAddress` - IP address
- `isActive` - Session status
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

## Default Data

### Root Admin
- **Email**: `root@backoffice.local`
- **Password**: `backoffice123`
- **Role**: `root`

### Default Company
- **Name**: `Back Office`
- **Email**: `admin@backoffice.local`

## API Reference

### Setup Functions

```typescript
// Complete database setup
await setupDatabase(config?: DatabaseConfig): Promise<DatabaseSetupResult>

// Initialize with retry logic
await initializeDatabaseWithRetry(maxRetries?: number, retryDelay?: number): Promise<DatabaseSetupResult>

// Test database connection
await testDatabaseConnection(): Promise<boolean>
```

### Migration Functions

```typescript
// Run migrations
await runMigrations(client: DrizzleClient, dbType: 'postgres' | 'sqlite'): Promise<void>

// Check if database is initialized
await isDatabaseInitialized(client: DrizzleClient, dbType: 'postgres' | 'sqlite'): Promise<boolean>
```

### Seeding Functions

```typescript
// Run seeds
await runSeeds(client: DrizzleClient, dbType: 'postgres' | 'sqlite'): Promise<void>

// Check if seeding is complete
await isSeedingComplete(client: DrizzleClient, dbType: 'postgres' | 'sqlite'): Promise<boolean>
```

### Configuration Functions

```typescript
// Get database configuration based on environment
getDatabaseConfig(): DatabaseConfig

// Ensure data directory exists (for SQLite)
ensureDataDirectory(): void
```

## File Structure

```
packages/database/
├── src/
│   ├── client.ts           # Database client creation
│   ├── config.ts           # Database connection configuration
│   ├── types.ts            # TypeScript type definitions
│   ├── setup.ts            # Complete setup process
│   ├── config/
│   │   └── local.ts        # Local configuration
│   ├── schema/
│   │   ├── index.ts        # Schema exports
│   │   ├── users.ts        # Users table schema
│   │   ├── companies.ts    # Companies table schema
│   │   └── sessions.ts     # Sessions table schema
│   ├── migrations/
│   │   └── index.ts        # Migration system
│   └── seeds/
│       └── index.ts        # Seeding system
├── package.json
└── README.md
```

## Development

### Local Development

1. The system automatically uses SQLite for development
2. Database file is created at `./data/backoffice.db`
3. Tables are created automatically on first run
4. Default data is seeded automatically

### Production Deployment

1. Set `NODE_ENV=production`
2. Set `DATABASE_TYPE=postgres`
3. Set `DATABASE_URL` to your PostgreSQL connection string
4. The system will automatically run migrations and seeding

## Contributing

1. Make sure to update schema files when adding new tables
2. Add corresponding migration code for new tables
3. Update seed data if needed
4. Test both SQLite and PostgreSQL compatibility 
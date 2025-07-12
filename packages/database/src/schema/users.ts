import { sql } from 'drizzle-orm';
import { text, timestamp, pgTable, uuid, boolean } from 'drizzle-orm/pg-core';
import { integer, sqliteTable, text as sqliteText } from 'drizzle-orm/sqlite-core';

// Helper to determine database type
const getDatabaseType = () => process.env.DATABASE_TYPE as 'postgres' | 'sqlite' || 'sqlite';

// PostgreSQL schema
export const usersPostgres = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  role: text('role').notNull().default('user'), // 'admin', 'user', 'root'
  isActive: boolean('is_active').notNull().default(true),
  emailVerified: boolean('email_verified').notNull().default(false),
  lastLogin: timestamp('last_login'),
  companyId: text('company_id'), // Foreign key to companies table
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// SQLite schema
export const usersSqlite = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: sqliteText('email').notNull().unique(),
  password: sqliteText('password').notNull(),
  firstName: sqliteText('first_name').notNull(),
  lastName: sqliteText('last_name').notNull(),
  role: sqliteText('role').notNull().default('user'), // 'admin', 'user', 'root'
  isActive: sqliteText('is_active').notNull().default('true'), // Using text for SQLite
  emailVerified: sqliteText('email_verified').notNull().default('false'), // Using text for SQLite
  lastLogin: sqliteText('last_login'), // Using text for SQLite timestamps
  companyId: sqliteText('company_id'), // Foreign key to companies table
  createdAt: sqliteText('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: sqliteText('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Export the appropriate schema based on database type
export const users = getDatabaseType() === 'postgres' ? usersPostgres : usersSqlite;

// Export type
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert; 
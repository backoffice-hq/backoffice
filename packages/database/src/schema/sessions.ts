import { sql } from 'drizzle-orm';
import { text, timestamp, pgTable, uuid } from 'drizzle-orm/pg-core';
import { integer, sqliteTable, text as sqliteText } from 'drizzle-orm/sqlite-core';

// Helper to determine database type
const getDatabaseType = () => process.env.DATABASE_TYPE as 'postgres' | 'sqlite' || 'sqlite';

// PostgreSQL schema
export const sessionsPostgres = pgTable('sessions', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: text('user_id').notNull(), // Foreign key to users table
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  userAgent: text('user_agent'),
  ipAddress: text('ip_address'),
  isActive: text('is_active').notNull().default('true'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// SQLite schema
export const sessionsSqlite = sqliteTable('sessions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: sqliteText('user_id').notNull(), // Foreign key to users table
  token: sqliteText('token').notNull().unique(),
  expiresAt: sqliteText('expires_at').notNull(), // Using text for SQLite timestamps
  userAgent: sqliteText('user_agent'),
  ipAddress: sqliteText('ip_address'),
  isActive: sqliteText('is_active').notNull().default('true'),
  createdAt: sqliteText('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: sqliteText('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Export the appropriate schema based on database type
export const sessions = getDatabaseType() === 'postgres' ? sessionsPostgres : sessionsSqlite;

// Export type
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert; 
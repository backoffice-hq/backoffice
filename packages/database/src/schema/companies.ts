import { sql } from 'drizzle-orm';
import { text, timestamp, pgTable, uuid, boolean } from 'drizzle-orm/pg-core';
import { integer, sqliteTable, text as sqliteText } from 'drizzle-orm/sqlite-core';

// Helper to determine database type
const getDatabaseType = () => process.env.DATABASE_TYPE as 'postgres' | 'sqlite' || 'sqlite';

// PostgreSQL schema
export const companiesPostgres = pgTable('companies', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  description: text('description'),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  website: text('website'),
  logo: text('logo'), // URL to logo image
  settings: text('settings'), // JSON string for company settings
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// SQLite schema
export const companiesSqlite = sqliteTable('companies', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: sqliteText('name').notNull(),
  description: sqliteText('description'),
  email: sqliteText('email'),
  phone: sqliteText('phone'),
  address: sqliteText('address'),
  website: sqliteText('website'),
  logo: sqliteText('logo'), // URL to logo image
  settings: sqliteText('settings'), // JSON string for company settings
  isActive: sqliteText('is_active').notNull().default('true'), // Using text for SQLite
  createdAt: sqliteText('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: sqliteText('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Export the appropriate schema based on database type
export const companies = getDatabaseType() === 'postgres' ? companiesPostgres : companiesSqlite;

// Export type
export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert; 
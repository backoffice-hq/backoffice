import { createTable } from "@backoffice/database";

export const users = createTable('users', (t: any) => ({
    id: t.uuid('id').primaryKey(),
    firstName: t.varchar('first_name', { length: 255 }),
    lastName: t.varchar('last_name', { length: 255 }),
    email: t.varchar('email', { length: 255 }),
    role: t.enum('role', ['admin', 'staff']),
    avatarUrl: t.varchar('avatar_url', { length: 255 }),
    active: t.boolean('active').default(true),
    password: t.varchar('password', { length: 255 }),
    metadata: t.jsonb('metadata').default({}),
    lastLogin: t.timestamp('last_login'),
    createdAt: t.timestamp('created_at').defaultNow(),
    updatedAt: t.timestamp('updated_at').defaultNow(),
}));
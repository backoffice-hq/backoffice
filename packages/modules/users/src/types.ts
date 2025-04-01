import { createTable } from "@backoffice/database";

export const users = createTable('users', (t: any) => ({
    id: t.uuid('id').primaryKey(),
    name: t.varchar('name', { length: 255 }),
}));

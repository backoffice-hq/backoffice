import { defineConfig } from "@backoffice/core";

export default defineConfig({
    // Company Information
    company: {
        name: "Acme Inc.",
        description: "Acme Inc. is a company that makes widgets.",
        website: "https://acme.com",
        email: "contact@acme.com",
        phone: "+1234567890",
        address: "123 Main St, Anytown, USA",
    },

    // Database
    database: {
        type: 'postgres',
        url: process.env.DATABASE_URL,
    },

    // Application Modules
    modules: [],
});

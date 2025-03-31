import { BackOfficeConfig } from "./types";

export const defaultConfig: Partial<BackOfficeConfig> = {
    company: {
        name: "Acme Inc.",
        description: "Acme Inc. is a company that makes widgets.",
        website: "https://acme.com",
        email: "contact@acme.com",
        phone: "+1234567890",
        address: "123 Main St, Anytown, USA",
    },
    env: (process.env.NODE_ENV as "development" | "production") || "development",
    modules: [],
};

/**
 * Production defaults
 */

export const productionDefaults: Partial<BackOfficeConfig> = {
    modules: [],
};

/**
 * Development defaults
 */

export const developmentDefaults: Partial<BackOfficeConfig> = {
    modules: [],
};

export function getDefaultsForEnvironment(env: string): Partial<BackOfficeConfig> {
    switch (env) {
        case 'production':
            return { ...defaultConfig, ...productionDefaults };
        default:
            return { ...defaultConfig, ...developmentDefaults };
    }
}
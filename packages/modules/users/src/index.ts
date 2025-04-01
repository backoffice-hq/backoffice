import { BackOfficeModule, ModuleConfig } from "@backoffice/core";

export interface UserModuleConfig extends ModuleConfig {
    enabledRoles?: string[];
}

const defaultConfig: UserModuleConfig = {
    id: "users",
    name: "Users",
    description: "Manage users and permissions",
    version: "1.0.0",
    author: "Back Office",
    create: () => ({
        info: {
            id: "users",
            name: "Users",
            description: "Manage users and permissions",
            version: "1.0.0",
            author: "Back Office",
            website: "https://backoffice.so"
        }
    }),
    enabledRoles: ["admin", "staff", "accountant"],
}

export const UsersModule: BackOfficeModule<UserModuleConfig> = {
    id: "users",
    name: "Users",
    description: "Manage users and permissions",
    version: "1.0.0",
    config: defaultConfig,
    getRoutes: () => [],
    getApiEndpoints: () => []
}
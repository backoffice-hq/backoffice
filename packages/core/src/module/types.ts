import { BackOfficeApp } from "../app";
export interface ModuleInfo {
    id: string;
    name: string;
    description: string;
    version: string;
    author: string;
    website: string;
}

export interface Module<options = any> {
    info: ModuleInfo;
}

/**
 * Module routes
 */
export interface RouteConfig {
    path: string;
    component: any;
    exact?: boolean;
    auth?: boolean;
    permissions?: string[];
}


export interface ApiEndpoint {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    handler: (req: Request, res: Response) => Promise<any>;
    middlewares?: any[];
    permissions?: string[];
}

/**
 * Module configuration
 */
export interface ModuleConfig {
    /**
     * Unique identifier for the module
     */
    id: string;

    /**
     * Module name
     */
    name: string;

    /**
     * Module description
     */
    description: string;

    /**
     * Module version
     */
    version: string;

    /**
     * Module author
     */
    author: string;
    
    /**
     * UI routes provided by the module
     */
    routes?: RouteConfig[];

    /**
     * API endpoints provided by the module
     */
    apiEndpoints?: ApiEndpoint[];

    /**
     * Module configuration
     */
    config?: any;

    /**
     * Factory method to create a module instance
     */
    create: (app: BackOfficeApp) => Module;
}

export interface ModuleDefinition<T extends ModuleConfig = ModuleConfig> {
    /**
     * Unique identifier for the module
     */
    id: string;

    /**
     * Human-readable name for the module
     */
    name: string;

    /**
     * Description of the module
     */
    description: string;

    /**
     * Version of the module
     */
    version: string;

    /**
     * Module configuration
     */
    config: T;

    /**
     * Factory method to create a module instance
     */
    create: (app: BackOfficeApp) => BackOfficeModule<T>;
}

/**
 * Instance of a loaded module
 */
export interface BackOfficeModule<T extends ModuleConfig = ModuleConfig> {
    /**
     * Unique identifier for the module
     */
    id: string;

    /**
     * Human-readable name for the module
     */
    name: string;

    /**
     * Description of the module
     */
    description: string;

    /**
     * Version of the module
     */
    version: string;
    
    /**
     * Configuration for the module
     */
    config: T;

    /**
     * Get the routes for the module
     */
    getRoutes: () => RouteConfig[];

    /**
     * Get the API endpoints for the module
     */
    getApiEndpoints: () => ApiEndpoint[];
}
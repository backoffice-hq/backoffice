import { BackOfficeConfig } from "./types";
import { getDefaultsForEnvironment } from "./default";
import deepmerge from "deepmerge";

export function defineConfig(config: Partial<BackOfficeConfig>): BackOfficeConfig {
    const env = config.env || (process.env.NODE_ENV as 'development' | 'production') || 'development';

    const envDefaults = getDefaultsForEnvironment(env);

    const mergedConfig = deepmerge(envDefaults as any, config as any, {
        arrayMerge: (_: unknown[], sourceArray: unknown[]) => sourceArray,
    }) as BackOfficeConfig;
    
    
    validateConfig(mergedConfig);

    return mergedConfig;
}

/**
 * Validate the config
 * @param config - The config to validate
 * @throws Error if the config is invalid
 */

function validateConfig(config: BackOfficeConfig): void {
    if (!config.company.name) {
        throw new Error("Company name is required");
    }
}
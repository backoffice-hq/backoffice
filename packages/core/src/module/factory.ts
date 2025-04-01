import { BackOfficeApp } from "../app";
import { Logger } from "../utils/logger";
import { ModuleDefinition, ModuleConfig, BackOfficeModule } from "./types";

const logger = new Logger("ModuleFactory");

/**
 * Creates a new Back Office module with the provided configuration
 * @param config - The configuration for the module
 * @returns A module definition that can be registered with the BackOfficeApp
 */

export function createModule<T extends ModuleConfig>(
  config: T
): ModuleDefinition<T> {
  // Validate the module configuration

  // Create the module definition
  const moduleDefinition: ModuleDefinition<T> = {
    id: config.id,
    name: config.name,
    description: config.description,
    version: config.version,
    config: config,
    create: (app: BackOfficeApp): BackOfficeModule<T> => {
      logger.debug(`Create module: ${config.id}`);

      return {
        id: config.id,
        name: config.name,
        description: config.description,
        version: config.version,
        config: config,

        // Provide access to routes if the module defines them
        getRoutes() {
          return config.routes || [];
        },

        // Provide access to API endpoints if the module defines them
        getApiEndpoints() {
          return config.apiEndpoints || [];
        },
      };
    },
  };

  return moduleDefinition;
}

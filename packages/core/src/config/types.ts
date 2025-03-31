import { Module } from "../module";

export interface CompanyConfig {
    name: string;
    description: string;
    website: string;
    email: string;
    phone: string;
    address: string;
}

export interface ModuleConfig {
    module: Module<any>;
    options?: any;
    enabled?: boolean;
}

export interface BackOfficeConfig {
    company: CompanyConfig;
    modules: ModuleConfig[];
    env?: 'development' | 'production';
}

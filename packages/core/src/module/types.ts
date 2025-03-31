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


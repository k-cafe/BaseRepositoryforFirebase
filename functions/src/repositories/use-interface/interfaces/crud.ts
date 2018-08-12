export interface Reference<T> {
    find(path: string): Promise<T>;
}

export interface ReferenceAll<T> {
    findAll(path: string): Promise<T[]>;
}

export interface Update {
    update(path: string, data: any);
}

export interface Delete {
    delete(path: string);
}
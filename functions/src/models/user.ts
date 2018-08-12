import { BaseModel } from "./interfaces/base-model";

export class User implements BaseModel {
    key?: string;
    name?: string;

    constructor(user: Partial<User> = {}) {
        this.key = user.key;
        this.name = user.name;
    }
}
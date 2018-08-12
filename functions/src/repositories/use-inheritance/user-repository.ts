import { BaseRepository } from "./base-repository";
import { User } from "../../models/user";

export class UserRepository extends BaseRepository<User> {

    constructor(type: new() => User) {
        super(type);
    }

    find(path: string): Promise<User> {
        return super.find(path);
    }
}
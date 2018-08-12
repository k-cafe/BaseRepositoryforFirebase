import { BaseModel } from "../../models/interfaces/base-model";
import { database } from "../../../node_modules/firebase-admin";
import { firebase } from "../../database/database";

type Constructor<T> = new() => T;

export abstract class BaseRepository<T extends BaseModel> {
    type: Constructor<T>;

    constructor(type: Constructor<T>) {
        this.type = type;
    }

    protected getSnapshot(path: string): Promise<database.DataSnapshot> {
        return firebase.ref(path).once('value');
    }

    protected find(path: string): Promise<T> {
        return this.getSnapshot(path)
                .then(snapshot => {
                    if(!snapshot.exists()) { return new this.type(); }
                    const data = snapshot.val() as T;
                    data.key = snapshot.key;
                    return data;
                });
    }

    protected findAll(path: string): Promise<T[]> {
        return this.getSnapshot(path)
                .then(snapshots => snapshots.exists() ? 
                    this.toList(snapshots) : [new this.type()]
                );
    }

    protected toList(snapshots: database.DataSnapshot): T[] {
        const list: T[] = []
        Object.keys(snapshots.val()).forEach(key => {
            const data = snapshots.val()[key] as T;
            data.key = key;
            list.push(data);
        });
        return list;
    }

    protected update(path: string, data: any) {
        firebase.ref(path).update(data);
    }
}
import { User } from "../../models/user";
import { Reference, Update, ReferenceAll } from "./interfaces/crud";
import { firebase } from "../../database/database";
import { database } from 'firebase-admin';

export class UserRepository implements Reference<User>, 
ReferenceAll<User>, Update {
    
    find(path: string): Promise<User> {
        return firebase.ref(path)
                .once('value')
                .then((snapshot: database.DataSnapshot) => 
                snapshot.exists() ? snapshot.val() as User : new User());
    }

    findAll(path: string): Promise<User[]> {
        return firebase.ref(path)
                .once('value')
                .then(snapshots => snapshots.exists() ? 
                    this.toList(snapshots) : [new User()]
                );
    }

    toList(snapshots: database.DataSnapshot): User[] {
        const list: User[] = []
        Object.keys(snapshots.val()).forEach(key => {
            const data = snapshots.val()[key] as User;
            data.key = key;
            list.push(data);
        });
        return list;
    }

    update(path: string, data: any) {
        firebase.ref(path).update(data);
    }
}
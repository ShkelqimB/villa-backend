import { db } from '../../db/index';
// import { randomBytes } from "crypto";
import { User } from '../../db/models/user.model';

export const UserService = {
    async getAllUsers(): Promise<User[]> {
        const user = await db.User.findAll<User>();
        return user;
    },

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await db.User.findOne<User>({ where: { email } });
        return user;
    },

    async getUserById(id: number): Promise<User | null> {
        const user = await db.User.findOne<User>({ where: { id } });
        return user;
    },

    async updateUser(id: number, values: User): Promise<boolean> {
        const [updatedUser] = await db.User.update<User>(values, {
            where: { id }
        });
        if (updatedUser) {
            console.log(`Updated rows: ${updatedUser}`);
            return true;
        } else {
            console.log("User not found");
            return false;
        }
    },

    async deleteUser(id: number): Promise<boolean> {
        const findRowBeforeDeleted = await db.User.findOne<User>({
            where: { id },
        });

        if (findRowBeforeDeleted) {
            await findRowBeforeDeleted.destroy() // deletes the row
            return true;
        }
        return false;
    },

    async createUser(value: User): Promise<User | null> {
        const user = {
            full_name: value.full_name,
            age: value.age,
            phone: value.phone,
            email: value.email,
            role: value.role,
            password: value.password
        }
        try {
            const createdUser = await db.User.create<User>(user)
            return createdUser;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

// // the length of the alphabet is assumed to be less than 256
// const createInfinitePool = (alphabet: string) => {
//     const size = alphabet.length;
//     const limit = (256 / size | 0) * size;
//     const poolSize = 8192;

//     // take up to a 8k of data at a time
//     let pool = randomBytes(poolSize).toJSON().data.filter(n => n < limit);
//     let index = 0;

//     return {
//         generate: (length: number) => {
//             if (pool.length <= index + length) {
//                 pool = randomBytes(poolSize).toJSON().data.filter(n => n < limit);
//                 index = 0;
//             }
//             const result = pool.slice(index, index + length).map(n => alphabet[n % size]).join('');
//             index += length;
//             return result;
//         }
//     }
// }

// const makeToken = (() => {
//     const alphabet = 'abcdefghijkmnpqrstuvwxzyABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
//     const pool = createInfinitePool(alphabet);
//     return () => pool.generate(40);
// })();

// const tomorrow = () => {
//     const result = new Date();
//     result.setDate(new Date().getDate() + 1)
//     return result;
// }

// const nextWeek = () => {
//     const result = new Date();
//     result.setDate(new Date().getDate() + 7)
//     return result;
// }
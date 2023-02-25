import { HASH_SALT } from '../../constants';
import { db } from '../../db/index';
import { User } from '../../db/models/user.model';
import { hash } from 'bcrypt';

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
        const hashedPass = await hash(value.password, HASH_SALT);

        const user = {
            full_name: value.full_name,
            age: value.age,
            phone: value.phone,
            email: value.email,
            role: value.role,
            password: hashedPass
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
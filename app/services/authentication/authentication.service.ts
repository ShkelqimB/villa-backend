import { db } from '../../db';
import { User } from '../../db/models/user.model';
import { correctPassword, signToken } from '../../helpers/jwt';

export const AuthenticationService = {
    async login(email: number, password: string): Promise<{ success: boolean, user?: User, token?: string }> {
        const user = await db.User.findOne<User>({ where: { email } });
        if (!user) {
            return {
                success: false
            }
        }
        const isCorrectPassword = await correctPassword(password, user?.password)
        if (!isCorrectPassword) {
            return {
                success: false
            }
        }
        const result = signToken(user);
        return {
            ...result,
            success: true
        };
    },
}
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/user.model';

const { JWT_SECRET = '~', JWT_EXPIRES_IN = +'', JWT_COOKIE_EXPIRES_IN = +'~' } = process.env;

export const correctPassword = (candidatePassword: string, userPassword: string) => {
    return compare(candidatePassword, userPassword);
}

export const signToken = (user: User) => {
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });

    return {
        token,
        user
    }
}
import { db } from '../../db';
import { randomBytes } from "crypto";

export const AuthenticationService = {
    // getTokenDetails(token: string): Promise<Token> {
    //     return new Promise(async (resolve, reject) => {
    //         const queryResult = await db.Token.findOne<Token>({
    //             mapToModel: true,
    //             nest: true,
    //             where: {
    //                 token,
    //             }
    //         });

    //         if (!queryResult) {
    //             return reject('Token not found')
    //         }

    //         if (queryResult.used) {
    //             return reject('Token already used');
    //         }

    //         return resolve(queryResult);
    //     })
    // },

    // async markUsed(token: string): Promise<boolean> {
    //     await db.Token.update<Token>({
    //         used: true
    //     }, {
    //         where: { token }
    //     });
    //     return true;
    // },
}

// const generateToken = async (email: string, onboarding: boolean, expiry: Date): Promise<Token> => {
//     // invalidate previous tokens, if any
//     await db.Token.update<Token>({
//         used: true
//     }, {
//         where: { email }
//     });
//     // generate the actual token
//     const token = {
//         email,
//         token: makeToken(),
//         expiry: expiry,
//         onboarding: onboarding,
//         used: false,
//     };

//     // save to database
//     const result = await db.Token.create<Token>(token);
//     return result;
// }

// the length of the alphabet is assumed to be less than 256
const createInfinitePool = (alphabet: string) => {
    const size = alphabet.length;
    const limit = (256 / size | 0) * size;
    const poolSize = 8192;

    // take up to a 8k of data at a time
    let pool = randomBytes(poolSize).toJSON().data.filter(n => n < limit);
    let index = 0;

    return {
        generate: (length: number) => {
            if (pool.length <= index + length) {
                pool = randomBytes(poolSize).toJSON().data.filter(n => n < limit);
                index = 0;
            }
            const result = pool.slice(index, index + length).map(n => alphabet[n % size]).join('');
            index += length;
            return result;
        }
    }
}

const makeToken = (() => {
    const alphabet = 'abcdefghijkmnpqrstuvwxzyABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
    const pool = createInfinitePool(alphabet);
    return () => pool.generate(40);
})();

const tomorrow = () => {
    const result = new Date();
    result.setDate(new Date().getDate() + 1)
    return result;
}

const nextWeek = () => {
    const result = new Date();
    result.setDate(new Date().getDate() + 7)
    return result;
}
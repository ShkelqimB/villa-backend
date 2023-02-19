export interface UserResult {
    id: number,
    full_name: string,
    age: number,
    phone: string,
    email: string,
    role: number,
    password: string,
    createdAt: Date,
    updatedAt: Date
}

export interface UsersList {
    last: boolean;
    users: UserResult[];
}

export enum Role {
    Admin = 1,
    Workers = 2
}

// export const userResultSortMap: SortMap<UserResult> = {
//     id: stringFieldSort("id"),
//     email: stringFieldSort("email"),
//     name: stringFieldSort("name"),
//     phoneNumber: stringFieldSort("phoneNumber"),
//     tags: stringFieldSort("tags"),
//     position: stringFieldSort("position"),
//     lastLogin: dateFieldSort("lastLogin"),
//     preferences: nullSort,
//     accesses: (f: UserResult, s: UserResult) => {
//         const first = f.accesses.map(acc => acc.name).sort().join(',');
//         const second = s.accesses.map(acc => acc.name).sort().join(',');
//         return first.localeCompare(second);
//     },
//     accounts: (f: UserResult, s: UserResult) => {
//         const first = f.accounts.map(acc => acc.name).sort().join(',');
//         const second = s.accounts.map(acc => acc.name).sort().join(',');
//         return first.localeCompare(second);
//     },
//     enabled: boolFieldSort("enabled"),
//     complete: nullSort
// }

// export interface BaseUserResult {
//     email: string;
//     name: string;
//     position: string;
// }

// export interface UserIdentity {
//     userId: string,
//     providerName: string,
//     providerType: string,
//     issuer: string | null,
//     primary: string,
//     dateCreated: string
// }
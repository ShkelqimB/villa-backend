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
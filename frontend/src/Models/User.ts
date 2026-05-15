export type UserProfileToken = {
    username:string;
    email:string;
    role:string;
    token: string
}

export type UserProfile = {
    id: number
    username:string;
    email:string;
    role: string;
    createdAt: string;
}

export type UserRegister = {
    userName:string;
    email:string;
    password: string;
}

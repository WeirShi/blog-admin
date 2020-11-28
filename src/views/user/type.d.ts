interface User {
    username: string;
    password: string;
}

export interface LoginInfo extends User {
    remember: boolean;
}

export interface RegistInfo extends User {
    confirmPwd: string;
}

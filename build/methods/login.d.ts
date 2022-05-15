export default function login(email: string, token?: string, password?: string): Promise<{
    token: string;
    userData: import("../types/loginStatusResponse").User;
}>;
//# sourceMappingURL=login.d.ts.map